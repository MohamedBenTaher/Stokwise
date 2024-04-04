import { Module } from '@nestjs/common';

import { RelationalFilePersistenceModule } from './infrastructure/persistence/repositories/persistence.module';
import { FilesService } from './files.service';
import { FileConfig, FileDriver } from './config/file-config.type';
import { FilesLocalModule } from './infrastructure/uploader/local/files.module';
import { FilesS3Module } from './infrastructure/uploader/s3/files.module';
import { FilesS3PresignedModule } from './infrastructure/uploader/s3-presigned/files.module';
import fileConfig from './config/file.config';

const infrastructureUploaderModule =
  (fileConfig() as FileConfig).driver === FileDriver.LOCAL
    ? FilesLocalModule
    : (fileConfig() as FileConfig).driver === FileDriver.S3
      ? FilesS3Module
      : FilesS3PresignedModule;

@Module({
  imports: [RelationalFilePersistenceModule, infrastructureUploaderModule],
  providers: [FilesService],
  exports: [FilesService, RelationalFilePersistenceModule],
})
export class FilesModule {}
