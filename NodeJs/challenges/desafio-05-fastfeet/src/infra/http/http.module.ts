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
import { CreateAddressRecipientController } from './controllers/recipient-controllers/create-address-recipient'
import { AddAddressUseCase } from '@/domain/delivery-management/application/use-cases-recipient/add-address'
import { GetAccountController } from './controllers/account-controllers/get-account.controller'
import { GetAccountUseCase } from '@/domain/delivery-management/application/use-cases-account/get-account'
import { DeleteAccountController } from './controllers/account-controllers/delete-account.controller'
import { DeleteAccountUseCase } from '@/domain/delivery-management/application/use-cases-account/delete-account'
import { EditAccountUseCase } from '@/domain/delivery-management/application/use-cases-account/edit-account'
import { EditAccountController } from './controllers/account-controllers/edit-account.controller'
import { GetOrderController } from './controllers/order-controllers/get-order.controller'
import { GetOrderUseCase } from '@/domain/delivery-management/application/use-cases-order/get-order'
import { FetchOrdersRecipientUseCase } from '@/domain/delivery-management/application/use-cases-order/fetch-orders-recipient'
import { FetchOrdersRecipientController } from './controllers/order-controllers/fetch-orders-recipient.controller'
import { DeleteOrderController } from './controllers/order-controllers/delete-order.controller'
import { DeleteOrderUseCase } from '@/domain/delivery-management/application/use-cases-order/delete-order'

@Module({
  imports: [DatabaseModule, CryptografyModule],
  controllers: [
    RegisterAccountController,
    AuthenticateController,
    GetAccountController,
    RegisterRecipientController,
    CreateOrderController,
    FetchOrdersDeliverymanController,
    FetchOrdersRecipientController,
    CreateAddressRecipientController,
    DeleteAccountController,
    EditAccountController,
    GetOrderController,
    DeleteOrderController,
  ],
  providers: [
    RegisterAccountUseCase,
    AuthenticateAccountUseCase,
    GetAccountUseCase,
    RegisterRecipientUseCase,
    RegisterOrderUseCase,
    FetchOrdersDeliverymanUseCase,
    FetchOrdersRecipientUseCase,
    AddAddressUseCase,
    DeleteAccountUseCase,
    EditAccountUseCase,
    GetOrderUseCase,
    DeleteOrderUseCase,
  ],
})
export class HttpModule {}
