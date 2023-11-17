import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { CryptografyModule } from '../cryptography/cryptografy.module'
import { RegisterAccountController } from './controllers/account-controllers/register-account.controller'
import { AuthenticateController } from './controllers/account-controllers/authenticate.controller'
import { RegisterRecipientController } from './controllers/recipient-controllers/register-recipient.controller'
import { CreateAddressRecipientController } from './controllers/recipient-controllers/create-address-recipient'
import { GetAccountController } from './controllers/account-controllers/get-account.controller'
import { CreateOrderController } from './controllers/order-controllers/create-order.controller'
import { GetOrderController } from './controllers/order-controllers/get-order.controller'
import { FetchOrdersDeliverymanController } from './controllers/order-controllers/fetch-orders-deliveryman.controller'
import { FetchOrdersRecipientController } from './controllers/order-controllers/fetch-orders-recipient.controller'
import { OrderAvailableController } from './controllers/order-controllers/order-available.controller'
import { OrderReturnedController } from './controllers/order-controllers/order-return.controller'
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
import { OrderAvailableUseCase } from '@/domain/delivery-management/application/use-cases-order/order-available'
import { OrderReturnUseCase } from '@/domain/delivery-management/application/use-cases-order/order-return'
import { EditAccountUseCase } from '@/domain/delivery-management/application/use-cases-account/edit-account'
import { DeleteOrderUseCase } from '@/domain/delivery-management/application/use-cases-order/delete-order'
import { DeleteAccountUseCase } from '@/domain/delivery-management/application/use-cases-account/delete-account'
import { DeliverOrderController } from './controllers/order-controllers/deliver-order.controller'
import { DeliverOrderUseCase } from '@/domain/delivery-management/application/use-cases-order/deliver-order'
import { OrderPickedUpController } from './controllers/order-controllers/order-picked-up.controller'
import { PickedUpOrderUseCase } from '@/domain/delivery-management/application/use-cases-order/picked-up-order'
import { FetchOrdersNearbyUseCase } from '@/domain/delivery-management/application/use-cases-order/fetch-orders-nearby'
import { FetchOrdersNearbyController } from './controllers/order-controllers/fetch-orders-nearby.controller'
import { GetRecipientController } from './controllers/recipient-controllers/get-recipient.controller'
import { GetRecipientUseCase } from '@/domain/delivery-management/application/use-cases-recipient/get-recipient'
import { DeleteRecipientController } from './controllers/recipient-controllers/delete-recipient.controller'
import { DeleteRecipientUseCase } from '@/domain/delivery-management/application/use-cases-recipient/delete-recipient'
import { EditRecipientUseCase } from '@/domain/delivery-management/application/use-cases-recipient/edit-recipient'
import { EditRecipientController } from './controllers/recipient-controllers/edit-recipient.controller'
import { ChooseBestAddressController } from './controllers/recipient-controllers/choose-best-address.controller'
import { ChooseBestAddressRecipientUseCase } from '@/domain/delivery-management/application/use-cases-recipient/choose-best-address-recipient'
import { ChooseRecipientNameController } from './controllers/recipient-controllers/choose-recipient-name.controller'
import { ChooseNameRecipientUseCase } from '@/domain/delivery-management/application/use-cases-recipient/choose-name-recipient'
import { UploadAttachmentsController } from './controllers/order-controllers/upload-attachments.controller'
import { UploadAndCreateAttachmentUseCase } from '@/domain/delivery-management/application/use-cases-order/upload-and-create-attachments'
import { StorageModule } from '../storage/storage.module'

@Module({
  imports: [DatabaseModule, CryptografyModule, StorageModule],
  controllers: [
    RegisterAccountController,
    AuthenticateController,
    GetAccountController,
    EditAccountController,
    DeleteAccountController,
    RegisterRecipientController,
    GetRecipientController,
    EditRecipientController,
    ChooseBestAddressController,
    ChooseRecipientNameController,
    DeleteRecipientController,
    CreateAddressRecipientController,
    CreateOrderController,
    FetchOrdersDeliverymanController,
    FetchOrdersRecipientController,
    FetchOrdersNearbyController,
    GetOrderController,
    OrderPickedUpController,
    OrderAvailableController,
    OrderReturnedController,
    DeliverOrderController,
    DeleteOrderController,
    UploadAttachmentsController,
  ],
  providers: [
    RegisterAccountUseCase,
    AuthenticateAccountUseCase,
    GetAccountUseCase,
    EditAccountUseCase,
    DeleteAccountUseCase,
    RegisterRecipientUseCase,
    GetRecipientUseCase,
    EditRecipientUseCase,
    ChooseBestAddressRecipientUseCase,
    ChooseNameRecipientUseCase,
    DeleteRecipientUseCase,
    AddAddressUseCase,
    RegisterOrderUseCase,
    FetchOrdersDeliverymanUseCase,
    FetchOrdersRecipientUseCase,
    FetchOrdersNearbyUseCase,
    GetOrderUseCase,
    OrderAvailableUseCase,
    PickedUpOrderUseCase,
    OrderReturnUseCase,
    DeliverOrderUseCase,
    DeleteOrderUseCase,
    UploadAndCreateAttachmentUseCase,
  ],
})
export class HttpModule {}
