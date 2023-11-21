import { Uploader } from '@/domain/delivery-management/application/storage/uploder'
import { Module } from '@nestjs/common'
import { EnvModule } from '../env/env.module'
import { DiskStorage } from './disk-storage'

@Module({
  imports: [EnvModule],
  providers: [{ provide: Uploader, useClass: DiskStorage }],
  exports: [Uploader],
})
export class StorageModule {}
