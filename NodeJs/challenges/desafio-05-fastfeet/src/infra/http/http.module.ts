import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { CryptografyModule } from '../cryptography/cryptografy.module'
import { RegisterAccountController } from './controllers/account-controllers/register-account.controller'
import { AuthenticateController } from './controllers/account-controllers/authenticate.controller'
import { RegisterRecipientController } from './controllers/recipient-controllers/create-recipient.controller'
import { CreateAddressRecipientController } from './controllers/recipient-controllers/create-address-recipient'
import { GetAccountController } from './controllers/account-controllers/get-account.controller'
import { CreateOrderController } from './controllers/order-controllers/create-order.controller'
import { GetOrderController } from './controllers/order-controllers/get-order.controller'
import { FetchOrdersDeliverymanController } from './controllers/order-controllers/fetch-orders-deliveryman.controller'
import { FetchOrdersRecipientController } from './controllers/order-controllers/fetch-orders-recipient.controller'
import { EditAccountController } from './controllers/account-controllers/edit-account.controller'
import { DeleteOrderController } from './controllers/order-controllers/delete-order.controller'
import { DeleteAccountController } from './controllers/account-controllers/delete-account.controller'

import { RegisterAccountUseCase } from '@/domain/delivery-management/application/use-cases-account/register-account'
import { AuthenticateAccountUseCase } from '@/domain/delivery-management/application/use-cases-account/authenticate-account'
import { RegisterRecipientUseCase } from '@/domain/delivery-management/application/use-cases-recipient/register-recipient'
import { AddAddressUseCase } from '@/domain/delivery-management/application/use-cases-recipient/add-address'
import { GetAccountUseCase } from '@/domain/delivery-management/application/use-cases-account/get-account'
import { RegisterOrderUseCase } from '@/domain/delivery-management/application/use-cases-order/register-order'
import { GetOrderUseCase } from '@/domain/delivery-management/application/use-cases-order/get-order'
import { FetchOrdersDeliverymanUseCase } from '@/domain/delivery-management/application/use-cases-order/fetch-orders-deliveryman'
import { FetchOrdersRecipientUseCase } from '@/domain/delivery-management/application/use-cases-order/fetch-orders-recipient'
import { EditAccountUseCase } from '@/domain/delivery-management/application/use-cases-account/edit-account'
import { DeleteOrderUseCase } from '@/domain/delivery-management/application/use-cases-order/delete-order'
import { DeleteAccountUseCase } from '@/domain/delivery-management/application/use-cases-account/delete-account'

@Module({
  imports: [DatabaseModule, CryptografyModule],
  controllers: [
    RegisterAccountController,
    AuthenticateController,
    RegisterRecipientController,
    CreateAddressRecipientController,
    GetAccountController,
    CreateOrderController,
    FetchOrdersDeliverymanController,
    FetchOrdersRecipientController,
    EditAccountController,
    GetOrderController,
    DeleteAccountController,
    DeleteOrderController,
  ],
  providers: [
    RegisterAccountUseCase,
    AuthenticateAccountUseCase,
    RegisterRecipientUseCase,
    AddAddressUseCase,
    GetAccountUseCase,
    RegisterOrderUseCase,
    FetchOrdersDeliverymanUseCase,
    FetchOrdersRecipientUseCase,
    EditAccountUseCase,
    GetOrderUseCase,
    DeleteAccountUseCase,
    DeleteOrderUseCase,
  ],
})
export class HttpModule {}
