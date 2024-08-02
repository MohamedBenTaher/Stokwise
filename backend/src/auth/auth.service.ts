import {
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import ms from 'ms';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';
import { AuthEmailLoginDto } from './dto/auth-email-login.dto';
import { AuthUpdateDto } from './dto/auth-update.dto';
import { AuthProvidersEnum } from './auth-providers.enum';
import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';
import { NullableType } from '../utils/types/nullable.type';
import { ConfigService } from '@nestjs/config';
import { JwtPayloadType } from './strategies/types/jwt-payload.type';
import { UsersService } from '../users/users.service';
import { AllConfigType } from '../config/config.type';
import { MailService } from '../mail/mail.service';
import { RoleEnum } from '../roles/roles.enum';
import { StatusEnum } from '../status/status.enum';
import { User } from '../users/domain/user';
import { LoginResponseType } from './types/login-response.type';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private mailService: MailService,
    private configService: ConfigService<AllConfigType>,
  ) {}

  async validateLogin(loginDto: AuthEmailLoginDto): Promise<{
    user: User;
    tokens: { token: string; refreshToken: string; tokenExpires: number };
  }> {
    const user = await this.usersService.findOne({
      email: loginDto.email,
    });

    if (!user) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          email: 'notFound',
        },
      });
    }

    if (user.provider !== AuthProvidersEnum.email) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          email: `needLoginViaProvider:${user.provider}`,
        },
      });
    }

    if (!user.password) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          password: 'incorrectPassword',
        },
      });
    }

    const isValidPassword = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          password: 'incorrectPassword',
        },
      });
    }

    const { token, refreshToken, tokenExpires } = await this.getTokensData({
      id: user.id,
      role: user.role,
    });

    return {
      user,
      tokens: {
        token,
        refreshToken,
        tokenExpires,
      },
    };
  }

  // async validateSocialLogin(authProvider: string): Promise<LoginResponseType> {
  //   let user: NullableType<User> = null;
  //   const socialEmail = socialData.email?.toLowerCase();
  //   let userByEmail: NullableType<User> = null;

  //   if (socialEmail) {
  //     userByEmail = this.usersService.findOne({
  //       email: socialEmail,
  //     });
  //   }

  //   if (socialData.id) {
  //     user = this.usersService.findOne({
  //       socialId: socialData.id,
  //       provider: authProvider,
  //     });
  //   }

  //   if (user) {
  //     if (socialEmail && !userByEmail) {
  //       user.email = socialEmail;
  //     }
  //     this.usersService.update(user.id, user);
  //   } else if (userByEmail) {
  //     user = userByEmail;
  //   } else if (socialData.id) {
  //     const role = {
  //       id: RoleEnum.user,
  //     };
  //     const status = {
  //       id: StatusEnum.active,
  //     };

  //     user = this.usersService.create({
  //       email: socialEmail ?? null,
  //       firstName: socialData.firstName ?? null,
  //       lastName: socialData.lastName ?? null,
  //       socialId: socialData.id,
  //       provider: authProvider,
  //       role,
  //       status,
  //     });

  //     user = this.usersService.findOne({
  //       id: user?.id,
  //     });
  //   }

  //   if (!user) {
  //     throw new UnprocessableEntityException({
  //       status: HttpStatus.UNPROCESSABLE_ENTITY,
  //       errors: {
  //         user: 'userNotFound',
  //       },
  //     });
  //   }

  //   const hash = crypto
  //     .createHash('sha256')
  //     .update(randomStringGenerator())
  //     .digest('hex');

  //   const session = await this.sessionService.create({
  //     user,
  //     hash,
  //   });

  //   const {
  //     token: jwtToken,
  //     refreshToken,
  //     tokenExpires,
  //   } = await this.getTokensData({
  //     id: user.id,
  //     role: user.role,
  //     sessionId: session.id,
  //     hash,
  //   });

  //   return {
  //     refreshToken,
  //     token: jwtToken,
  //     tokenExpires,
  //     user,
  //   };
  // }

  async register(dto: AuthRegisterLoginDto): Promise<void> {
    const user = await this.usersService.create({
      ...dto,
      email: dto.email,
      role: {
        id: RoleEnum.user,
      },
      status: {
        id: StatusEnum.inactive,
      },
    });

    const hash = await this.jwtService.signAsync(
      {
        confirmEmailUserId: user.id,
      },
      {
        secret: this.configService.getOrThrow('auth.confirmEmailSecret', {
          infer: true,
        }),
        expiresIn: this.configService.getOrThrow('auth.confirmEmailExpires', {
          infer: true,
        }),
      },
    );

    await this.mailService.userSignUp({
      to: dto.email,
      data: {
        hash,
      },
    });
  }

  async confirmEmail(hash: string): Promise<LoginResponseType> {
    let userId: User['id'];

    try {
      const jwtData = await this.jwtService.verifyAsync<{
        confirmEmailUserId: User['id'];
      }>(hash, {
        secret: this.configService.getOrThrow('auth.confirmEmailSecret', {
          infer: true,
        }),
      });

      userId = jwtData.confirmEmailUserId;
    } catch {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          hash: `invalidHash`,
        },
      });
    }

    const user = await this.usersService.findOne({
      id: userId,
    });

    if (!user || user?.status?.id !== StatusEnum.inactive) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: `notFound`,
      });
    }

    user.status = {
      id: StatusEnum.active,
    };

    this.usersService.update(user.id, user);
    const { token, refreshToken, tokenExpires } = await this.getTokensData({
      id: user.id,
      role: user.role,
    });
    return {
      user,
      tokens: {
        token,
        refreshToken,
        tokenExpires,
      },
    };
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await this.usersService.findOne({
      email,
    });

    if (!user) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          email: 'emailNotExists',
        },
      });
    }

    const tokenExpiresIn = this.configService.getOrThrow('auth.forgotExpires', {
      infer: true,
    });

    const tokenExpires = Date.now() + ms(tokenExpiresIn);

    const hash = await this.jwtService.signAsync(
      {
        forgotUserId: user.id,
      },
      {
        secret: this.configService.getOrThrow('auth.forgotSecret', {
          infer: true,
        }),
        expiresIn: tokenExpiresIn,
      },
    );

    await this.mailService.forgotPassword({
      to: email,
      data: {
        hash,
        tokenExpires,
      },
    });
  }

  async resetPassword(
    hash: string,
    password: string,
  ): Promise<{
    tokens: { token: string; refreshToken: string; tokenExpires: number };
  }> {
    let userId: User['id'];

    try {
      const jwtData = await this.jwtService.verifyAsync<{
        forgotUserId: User['id'];
      }>(hash, {
        secret: this.configService.getOrThrow('auth.forgotSecret', {
          infer: true,
        }),
      });

      userId = jwtData.forgotUserId;
    } catch {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          hash: `invalidHash`,
        },
      });
    }

    const user = await this.usersService.findOne({
      id: userId,
    });

    if (!user) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          hash: `notFound`,
        },
      });
    }

    user.password = password;

    await this.usersService.update(user.id, user);

    const { token, refreshToken, tokenExpires } = await this.getTokensData({
      id: user.id,
      role: user.role,
    });

    return {
      tokens: {
        token,
        refreshToken,
        tokenExpires,
      },
    };
  }

  async me(userJwtPayload: JwtPayloadType): Promise<NullableType<User>> {
    return this.usersService.findOne({
      id: userJwtPayload.id,
    });
  }

  async update(
    userJwtPayload: JwtPayloadType,
    userDto: AuthUpdateDto,
  ): Promise<NullableType<User>> {
    if (userDto.password) {
      if (!userDto.oldPassword) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            oldPassword: 'missingOldPassword',
          },
        });
      }

      const currentUser = await this.usersService.findOne({
        id: userJwtPayload.id,
      });

      if (!currentUser) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            user: 'userNotFound',
          },
        });
      }

      if (!currentUser.password) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            oldPassword: 'incorrectOldPassword',
          },
        });
      }

      const isValidOldPassword = await bcrypt.compare(
        userDto.oldPassword,
        currentUser.password,
      );

      if (!isValidOldPassword) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            oldPassword: 'incorrectOldPassword',
          },
        });
      }
    }

    await this.usersService.update(userJwtPayload.id, userDto);

    return this.usersService.findOne({
      id: userJwtPayload.id,
    });
  }

  async refreshToken(refreshToken: string): Promise<{
    tokens: { token: string; refreshToken: string; tokenExpires: number };
  }> {
    const user = await this.usersService.findOne({
      refreshToken: refreshToken,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    const {
      token,
      refreshToken: newRefreshToken,
      tokenExpires,
    } = await this.getTokensData({
      id: user.id,
      role: user.role,
    });

    user.refreshToken = newRefreshToken;
    await this.usersService.update(user.id, user);

    return {
      tokens: {
        token,
        refreshToken: newRefreshToken,
        tokenExpires,
      },
    };
  }

  async softDelete(user: User): Promise<void> {
    await this.usersService.softDelete(user.id);
  }

  async logout(refreshToken: string): Promise<void> {
    const user = await this.usersService.findOne({
      refreshToken: refreshToken,
    });

    if (!user) {
      throw new UnauthorizedException();
    }
    user.refreshToken = null;
    await this.usersService.update(user.id, user);
  }

  private async getTokensData(data: { id: User['id']; role: User['role'] }) {
    const tokenExpiresIn = this.configService.getOrThrow('auth.expires', {
      infer: true,
    });

    const tokenExpires = Date.now() + ms(tokenExpiresIn);

    const [token, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: data.id,
          role: data.role,
        },
        {
          secret: this.configService.getOrThrow('auth.secret', { infer: true }),
          expiresIn: tokenExpiresIn,
        },
      ),
      this.jwtService.signAsync(
        {
          id: data.id,
        },
        {
          secret: this.configService.getOrThrow('auth.refreshSecret', {
            infer: true,
          }),
          expiresIn: this.configService.getOrThrow('auth.refreshExpires', {
            infer: true,
          }),
        },
      ),
    ]);

    return {
      token,
      refreshToken,
      tokenExpires,
    };
  }
}
