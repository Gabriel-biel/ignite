import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaAccountRepository } from './prisma/repositories/prisma-account-repository'
import { PrismaRecipientsRepository } from './prisma/repositories/prisma-recipient-repository'
import { PrismaAddressesRepository } from './prisma/repositories/prisma-address-respository'
import { PrismaOrdersRepository } from './prisma/repositories/prisma-order-repository'
import { PrismaOrderAttachmentsRepository } from './prisma/repositories/prisma-order-attachments-repository'
import { PrismaAttachmentsRepository } from './prisma/repositories/prisma-attachments-repository'
import { PrismaNotificationsRepository } from './prisma/repositories/prisma-notifications-repository'

import { AccountRepository } from '@/domain/delivery-management/application/repositories/account-repository'
import { RecipientRepository } from '@/domain/delivery-management/application/repositories/recipient-respository'
import { OrderRepository } from '@/domain/delivery-management/application/repositories/order-repository'
import { AddressRepository } from '@/domain/delivery-management/application/repositories/address-repository'
import { OrderAttachmentsRepository } from '@/domain/delivery-management/application/repositories/order-attachments-repository'
import { AttachmentsRepository } from '@/domain/delivery-management/application/repositories/attachments-repository'
import { NotificationsRepository } from '@/domain/notification/application/repositories/notifications-repository'
import { CacheModule } from '../cache/cache.module'

@Module({
  imports: [CacheModule],
  providers: [
    PrismaService,
    {
      provide: AddressRepository,
      useClass: PrismaAddressesRepository,
    },
    {
      provide: AccountRepository,
      useClass: PrismaAccountRepository,
    },
    {
      provide: NotificationsRepository,
      useClass: PrismaNotificationsRepository,
    },
    {
      provide: OrderAttachmentsRepository,
      useClass: PrismaOrderAttachmentsRepository,
    },
    {
      provide: OrderRepository,
      useClass: PrismaOrdersRepository,
    },
    {
      provide: AttachmentsRepository,
      useClass: PrismaAttachmentsRepository,
    },
    {
      provide: RecipientRepository,
      useClass: PrismaRecipientsRepository,
    },
  ], // deixa o service disponível para esse module.
  exports: [
    PrismaService,
    AddressRepository,
    AccountRepository,
    RecipientRepository,
    OrderRepository,
    OrderAttachmentsRepository,
    AttachmentsRepository,
    NotificationsRepository,
  ], // serve para deixar esse serviço disponível para os modules que o importam também
})
export class DatabaseModule {}
