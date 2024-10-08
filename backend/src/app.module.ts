import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule, CacheStoreFactory } from '@nestjs/cache-manager';
import { TypeOrmConfigService } from 'src/database/typorm-config.service';
import databseConfig from 'src/database/config/databse.config';
import appConfig from './config/app.config';
import mailConfig from './mail/config/mail.config';
import fileConfig from './files/config/file.config';
import authConfig from './auth/config/auth.config';
import MarketNewsconfig from './market-news/config/market-news.config';
import { config } from 'dotenv';
import { resolve } from 'path';
import { MailerModule } from './mailer/mailer.module';
import { MailModule } from './mail/mail.module';
import { HeaderResolver, I18nModule } from 'nestjs-i18n';
import { AllConfigType } from './config/config.type';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { AuthMiddleware } from './auth/middleware/middleware';
import { MarketNewsService } from './market-news/market-news.service';
import { ScheduleModule } from '@nestjs/schedule';
import { MarketNewsController } from './market-news/market-news.controller';
import { MarketNewsModule } from './market-news/market-news.module';
import { HttpModule } from '@nestjs/axios';
import { StocksModule } from './stocks/stocks.module';
import * as redisStore from 'cache-manager-redis-store';
import redisConfig from './redis/config/redis.config';

config({ path: resolve(__dirname, '.env') });

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        databseConfig,
        appConfig,
        mailConfig,
        fileConfig,
        authConfig,
        MarketNewsconfig,
        redisConfig,
      ],
      envFilePath: ['.env'],
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<AllConfigType>) => ({
        store: redisStore as unknown as CacheStoreFactory,
        host: configService.getOrThrow<string>(
          'redis.host' as keyof AllConfigType,
          'localhost',
        ), // Default to 'localhost' if not set
        port: configService.getOrThrow<number>(
          'redis.port' as keyof AllConfigType,
          6379,
        ), // Default to 6379 if not set
        ttl: 600, // cache expiration in seconds
      }),
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
    ScheduleModule.forRoot(),
    MarketNewsModule,
    HttpModule,
    StocksModule,
  ],
  controllers: [AppController, MarketNewsController],
  providers: [AppService, MarketNewsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'auth/email/login', method: RequestMethod.POST },
        { path: 'auth/email/register', method: RequestMethod.POST },
        { path: 'auth/email/confirm', method: RequestMethod.POST },
        { path: 'auth/forgot/password', method: RequestMethod.POST },
        { path: 'auth/reset/password', method: RequestMethod.POST },
        { path: 'market-news', method: RequestMethod.GET },
      )
      .forRoutes('*');
  }
}
