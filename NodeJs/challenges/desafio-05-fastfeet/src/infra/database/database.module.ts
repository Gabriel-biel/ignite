import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'

@Module({
  providers: [PrismaService], // deixa o service disponível para esse module.
  exports: [PrismaService], // serve para deixar esse serviço disponível para os modules que o importam também
})
export class DatabaseModule {}
