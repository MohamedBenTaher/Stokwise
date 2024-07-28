import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AuthConfirmPasswordResponseDto {
  @ApiProperty()
  @IsNotEmpty()
  token: string;

  @ApiProperty()
  @IsNotEmpty()
  refreshToken: string;

  @ApiProperty()
  @IsNotEmpty()
  tokenExpires: number;
}
