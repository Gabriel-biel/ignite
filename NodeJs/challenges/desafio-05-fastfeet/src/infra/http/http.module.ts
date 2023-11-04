import { Module } from '@nestjs/common'
import { RegisterAccountController } from './controllers/account-controllers/register-account.controller'
import { AuthenticateController } from './controllers/account-controllers/authenticate.controller'
import { RegisterRecipientController } from './controllers/recipient-controllers/create-recipient.controller'
import { CreateOrderController } from './controllers/order-controllers/create-order.controller'
import { FetchOrdersAccountController } from './controllers/order-controllers/fetch-orders-account.controller'
import { DatabaseModule } from '../database/database.module'
import { RegisterRecipientUseCase } from '@/domain/delivery-management/application/use-cases-recipient/register-recipient'
import { RegisterAccountUseCase } from '@/domain/delivery-management/application/use-cases-account/register-account'
import { AuthenticateAccountUseCase } from '@/domain/delivery-management/application/use-cases-account/authenticate-account'
import { CryptografyModule } from '../cryptography/cryptografy.module'
import { RegisterOrderUseCase } from '@/domain/delivery-management/application/use-cases-order/register-order'

@Module({
  imports: [DatabaseModule, CryptografyModule],
  controllers: [
    RegisterAccountController,
    AuthenticateController,
    RegisterRecipientController,
    CreateOrderController,
    FetchOrdersAccountController,
  ],
  providers: [
    RegisterAccountUseCase,
    AuthenticateAccountUseCase,
    RegisterRecipientUseCase,
    RegisterOrderUseCase,
  ],
})
export class HttpModule {}
