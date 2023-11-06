import { Module } from '@nestjs/common'
import { RegisterAccountController } from './controllers/account-controllers/register-account.controller'
import { AuthenticateController } from './controllers/account-controllers/authenticate.controller'
import { RegisterRecipientController } from './controllers/recipient-controllers/create-recipient.controller'
import { CreateOrderController } from './controllers/order-controllers/create-order.controller'
import { FetchOrdersDeliverymanController } from './controllers/order-controllers/fetch-orders-deliveryman.controller'

import { DatabaseModule } from '../database/database.module'
import { CryptografyModule } from '../cryptography/cryptografy.module'
import { RegisterAccountUseCase } from '@/domain/delivery-management/application/use-cases-account/register-account'
import { AuthenticateAccountUseCase } from '@/domain/delivery-management/application/use-cases-account/authenticate-account'
import { RegisterRecipientUseCase } from '@/domain/delivery-management/application/use-cases-recipient/register-recipient'
import { RegisterOrderUseCase } from '@/domain/delivery-management/application/use-cases-order/register-order'
import { FetchOrdersDeliverymanUseCase } from '@/domain/delivery-management/application/use-cases-order/fetch-orders-deliveryman'

@Module({
  imports: [DatabaseModule, CryptografyModule],
  controllers: [
    RegisterAccountController,
    AuthenticateController,
    RegisterRecipientController,
    CreateOrderController,
    FetchOrdersDeliverymanController,
  ],
  providers: [
    RegisterAccountUseCase,
    AuthenticateAccountUseCase,
    RegisterRecipientUseCase,
    RegisterOrderUseCase,
    FetchOrdersDeliverymanUseCase,
  ],
})
export class HttpModule {}
