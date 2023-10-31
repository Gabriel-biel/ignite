import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaAddressesRepository } from './prisma/repositories/prisma-address-respository'
import { PrismaAccountRepository } from './prisma/repositories/prisma-account-repository'
import { PrismaNotiicationsRepository } from './prisma/repositories/prisma-notificiations-repository'
import { PrismaOrderAttachmentsRepository } from './prisma/repositories/prisma-order-attachments-repository'
import { PrismaOrdersRepository } from './prisma/repositories/prisma-order-repository'
import { PrismaRecipientsRepository } from './prisma/repositories/prisma-recipient-repository'
import { RecipientRepository } from '@/domain/delivery-management/application/repositories/recipient-respository'
import { AccountRepository } from '@/domain/delivery-management/application/repositories/account-repository'

@Module({
  providers: [
    PrismaService,
    PrismaAddressesRepository,
    {
      provide: AccountRepository,
      useClass: PrismaAccountRepository,
    },
    PrismaNotiicationsRepository,
    PrismaOrderAttachmentsRepository,
    PrismaOrdersRepository,
    {
      provide: RecipientRepository,
      useClass: PrismaRecipientsRepository,
    },
  ], // deixa o service disponível para esse module.
  exports: [
    PrismaService,
    PrismaAddressesRepository,
    AccountRepository,
    PrismaNotiicationsRepository,
    PrismaOrderAttachmentsRepository,
    PrismaOrdersRepository,
    RecipientRepository,
  ], // serve para deixar esse serviço disponível para os modules que o importam também
})
export class DatabaseModule {}
