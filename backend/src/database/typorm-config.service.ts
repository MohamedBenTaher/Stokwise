import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { AllConfigType } from 'src/config/config.type';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService<AllConfigType>) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const type = this.configService.get('database.type', { infer: true });
    const host = this.configService.get('database.host', { infer: true });
    const port = this.configService.get('database.port', { infer: true });
    const username = this.configService.get('database.username', {
      infer: true,
    });
    const password = this.configService.get('database.password', {
      infer: true,
    });
    const database = this.configService.get('database.name', { infer: true });
    const synchronize = this.configService.get('database.synchronize', {
      infer: true,
    });
    const maxConnections = this.configService.get('database.maxConnections', {
      infer: true,
    });

    return {
      type,
      host,
      port,
      username,
      password,
      database,
      synchronize,
      dropSchema: false,
      keepConnectionAlive: true,
      logging: process.env.NODE_ENV !== 'production',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      cli: {
        entitiesDir: 'src',
        subscribersDir: 'subscriber',
      },
      extra: {
        max: maxConnections,
      },
    } as TypeOrmModuleOptions;
  }
}
