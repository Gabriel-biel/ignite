import { Module } from '@nestjs/common'
import { CreateAccountController } from './controllers/create-account.controller'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateRecipientController } from './controllers/create-recipient.controller'
import { CreateOrderController } from './controllers/create-order.controller'
import { FetchOrdersDeliverymanController } from './controllers/fetch-orders-deliveryman.controller'
import { DatabaseModule } from '../database/database.module'

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateRecipientController,
    CreateOrderController,
    FetchOrdersDeliverymanController,
  ],
})
export class HttpModule {}
