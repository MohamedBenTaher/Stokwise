import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileRelationalRepository } from '../../repositories/file.respository';
import { FileRepository } from '../../file.repository';
import { FileEntity } from '../../entities/file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity])],
  providers: [
    {
      provide: FileRepository,
      useClass: FileRelationalRepository,
    },
  ],
  exports: [FileRepository],
})
export class RelationalFilePersistenceModule {}
