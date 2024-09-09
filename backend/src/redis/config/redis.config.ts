import { registerAs } from '@nestjs/config';

import { IsInt, Min, Max, IsString, ValidateIf } from 'class-validator';
import validateConfig from '../../utils/validate-config';
import { config } from 'dotenv';
import * as path from 'path';
import { RedisConfig } from './redis-config.type';
config({ path: path.resolve(__dirname, '../../.env') });

class EnvironmentVariablesValidator {
  @ValidateIf((envValues) => !envValues.REDIS_HOST)
  @IsString()
  REDIS_HOST: string;

  @ValidateIf((envValues) => !envValues.REDIS_PASSWORD)
  @IsString()
  REDIS_PASSWORD: string;

  @ValidateIf((envValues) => !envValues.REDIS_PORT)
  @IsInt()
  @Min(0)
  @Max(65535)
  REDIS_PORT: number;
}

export default registerAs<RedisConfig>('redis', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);
  return {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : 6379,
    password: process.env.REDIS_PASSWORD,
  };
});
