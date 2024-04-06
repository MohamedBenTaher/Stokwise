import { Injectable } from '@nestjs/common';
import { FileType } from './domain/file';
import { EntityCondition } from '../utils/types/entity-condiion.type';
import { NullableType } from '../utils/types/nullable.type';
import { FileRepository } from './infrastructure/file.repository';

@Injectable()
export class FilesService {
  constructor(private readonly fileRepository: FileRepository) {}

  findOne(fields: EntityCondition<FileType>): Promise<NullableType<FileType>> {
    return this.fileRepository.findOne(fields);
  }
}
