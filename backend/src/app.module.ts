import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from 'src/database/typorm-config.service';

import databseConfig from 'src/database/config/databse.config';
import appConfig from './config/app.config';
import mailConfig from './mail/config/mail.config';
import fileConfig from './files/config/file.config';
import authConfig from './auth/config/auth.config';
import { config } from 'dotenv';
import { resolve } from 'path';
import { MailerModule } from './mailer/mailer.module';
import { MailModule } from './mail/mail.module';
import { HeaderResolver, I18nModule } from 'nestjs-i18n';
import { AllConfigType } from './config/config.type';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';

config({ path: resolve(__dirname, '.env') });

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databseConfig, appConfig, mailConfig, fileConfig, authConfig],
      envFilePath: ['.env'],
    }),
    UsersModule,
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService<AllConfigType>) => ({
        fallbackLanguage: configService.getOrThrow('app.fallbackLanguage', {
          infer: true,
        }),
        loaderOptions: {
          path: resolve(__dirname, './i18n/'),
          watch: true,
        },
      }),
      resolvers: [
        {
          use: HeaderResolver,
          useFactory: (configService: ConfigService<AllConfigType>) => {
            return [
              configService.get('app.headerLanguage', {
                infer: true,
              }),
            ];
          },
          inject: [ConfigService],
        },
      ],
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    MailerModule,
    MailModule,
    AuthModule,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
