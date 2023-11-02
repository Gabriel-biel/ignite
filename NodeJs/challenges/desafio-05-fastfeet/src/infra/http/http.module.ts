import { Module } from '@nestjs/common'
import { RegisterAccountController } from './controllers/register-account.controller'
import { AuthenticateController } from './controllers/authenticate.controller'
import { RegisterRecipientController } from './controllers/create-recipient.controller'
import { CreateOrderController } from './controllers/create-order.controller'
import { FetchOrdersAccountController } from './controllers/fetch-orders-account.controller'
import { DatabaseModule } from '../database/database.module'
import { RegisterRecipientUseCase } from '@/domain/delivery-management/application/use-cases-recipient/register-recipient'
import { RegisterAccountUseCase } from '@/domain/delivery-management/application/use-cases-account/register-account'

@Module({
  imports: [DatabaseModule],
  controllers: [
    RegisterAccountController,
    AuthenticateController,
    RegisterRecipientController,
    CreateOrderController,
    FetchOrdersAccountController,
  ],
  providers: [RegisterRecipientUseCase, RegisterAccountUseCase],
})
export class HttpModule {}
