import { IsString } from 'class-validator';
import validateConfig from '../../utils/validate-config';
import { AuthConfig } from './auth-config.type';
import { registerAs } from '@nestjs/config';

class EnvironmentVariablesValidator {
  @IsString()
  AUTH_JWT_SECRET: string;

  @IsString()
  AUTH_JWT_TOKEN_EXPIRES_IN: string;

  @IsString()
  AUTH_REFRESH_SECRET: string;

  @IsString()
  AUTH_REFRESH_TOKEN_EXPIRES_IN: string;

  @IsString()
  AUTH_FORGOT_SECRET: string;

  @IsString()
  AUTH_FORGOT_TOKEN_EXPIRES_IN: string;

  @IsString()
  AUTH_CONFIRM_EMAIL_SECRET: string;

  @IsString()
  AUTH_CONFIRM_EMAIL_TOKEN_EXPIRES_IN: string;
}

export default registerAs<AuthConfig>('auth', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);
  console.log('process.env.AUTH_JWT_SECRET', process.env.AUTH_JWT_SECRET);
  console.log(
    'process.env.AUTH_JWT_TOKEN_EXPIRES_IN',
    process.env.AUTH_JWT_TOKEN_EXPIRES_IN,
  );
  console.log(
    'process.env.AUTH_REFRESH_SECRET',
    process.env.AUTH_REFRESH_SECRET,
  );
  console.log(
    'process.env.AUTH_REFRESH_TOKEN_EXPIRES_IN',
    process.env.AUTH_REFRESH_TOKEN_EXPIRES_IN,
  );
  console.log('process.env.AUTH_FORGOT_SECRET', process.env.AUTH_FORGOT_SECRET);

  return {
    secret: process.env.AUTH_JWT_SECRET,
    expires: process.env.AUTH_JWT_TOKEN_EXPIRES_IN,
    refreshSecret: process.env.AUTH_REFRESH_SECRET,
    refreshExpires: process.env.AUTH_REFRESH_TOKEN_EXPIRES_IN,
    forgotSecret: process.env.AUTH_FORGOT_SECRET,
    forgotExpires: process.env.AUTH_FORGOT_TOKEN_EXPIRES_IN,
    confirmEmailSecret: process.env.AUTH_CONFIRM_EMAIL_SECRET,
    confirmEmailExpires: process.env.AUTH_CONFIRM_EMAIL_TOKEN_EXPIRES_IN,
  };
});
