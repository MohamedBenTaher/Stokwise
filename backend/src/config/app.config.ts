import { registerAs } from '@nestjs/config';
import { AppConfig } from './app-config.type';
import validateConfig from '.././utils/validate-config';
import { IsInt, IsOptional, IsString, IsUrl, Max, Min } from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

class EnvironmentVariablesValidator {
  @IsOptional()
  NODE_ENV: Environment;

  @IsInt()
  @Min(0)
  @Max(65535)
  @IsOptional()
  APP_PORT: number;

  @IsUrl({ require_tld: false })
  @IsOptional()
  FRONTEND_DOMAIN: string;

  @IsUrl({ require_tld: false })
  @IsOptional()
  BACKEND_DOMAIN: string;

  @IsString()
  @IsOptional()
  API_PREFIX: string;

  @IsString()
  @IsOptional()
  APP_FALLBACK_LANGUAGE: string;

  @IsString()
  @IsOptional()
  APP_HEADER_LANGUAGE: string;
}

export default registerAs<AppConfig>('app', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);
  const port = process.env.BACKEND_PORT;
  console.log('port', port);
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
    nodeEnv: process.env.NODE_ENV || 'development',
    name: process.env.APP_NAME || 'app',
    workingDirectory: process.env.PWD || process.cwd(),
    frontendDomain: process.env.FRONTEND_DOMAIN,
    fallbackLanguage: process.env.APP_FALLBACK_LANGUAGE || 'en',
    backendDomain: process.env.BACKEND_DOMAIN ?? 'http://localhost',
    port: process.env.APP_PORT
      ? parseInt(process.env.APP_PORT, 10)
      : process.env.PORT
        ? parseInt(process.env.PORT, 10)
        : 3000,
    apiPrefix: process.env.API_PREFIX ?? 'api',
    headerLanguage: process.env.APP_HEADER_LANGUAGE ?? 'x-custom-lang',
  };
});
