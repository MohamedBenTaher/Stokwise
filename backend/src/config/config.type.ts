import { DatabaseConfig } from 'src/database/config/database-config.type';
import { AppConfig } from './app-config.type';
import { MailConfig } from 'src/mail/config/mail-config.type';
import { FileConfig } from 'src/files/config/file-config.type';

export type AllConfigType = {
  database: DatabaseConfig;
  app: AppConfig;
  mail: MailConfig;
  file: FileConfig;
};
