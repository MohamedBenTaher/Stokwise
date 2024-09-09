import { DatabaseConfig } from 'src/database/config/database-config.type';
import { AppConfig } from './app-config.type';
import { MailConfig } from 'src/mail/config/mail-config.type';
import { FileConfig } from 'src/files/config/file-config.type';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { AuthConfig } from 'src/auth/config/auth-config.type';
import { MarketNewsconfig } from 'src/market-news/config/market-news-config.type';
import { RedisConfig } from 'src/redis/config/redis-config.type';

dotenv.config({ path: path.resolve(__dirname, '../.env') });
console.log('process env', path.resolve(__dirname, '../.env'));
export type AllConfigType = {
  database: DatabaseConfig;
  redis: RedisConfig;
  app: AppConfig;
  mail: MailConfig;
  file: FileConfig;
  auth: AuthConfig;
  thirdParty: {
    market: MarketNewsconfig;
  };
};
