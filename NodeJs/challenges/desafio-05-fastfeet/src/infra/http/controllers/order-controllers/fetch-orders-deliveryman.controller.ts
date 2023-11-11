import { Controller, Get, Query, BadRequestException } from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { FetchOrdersDeliverymanUseCase } from '@/domain/delivery-management/application/use-cases-order/fetch-orders-deliveryman'
import { OrderPresenter } from '../../presenters/order-presenter'

const pageQuerySchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

type PageQuerySchema = z.infer<typeof pageQuerySchema>

const queryValidationPipe = new ZodValidationPipe(pageQuerySchema)

@Controller('/orders/deliveryman')
export class FetchOrdersDeliverymanController {
  constructor(private fetchOrdersByAccount: FetchOrdersDeliverymanUseCase) {}

  @Get()
  async handle(
    @Query('page', queryValidationPipe) page: PageQuerySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const deliverymanId = user.sub

    const result = await this.fetchOrdersByAccount.execute({
      deliverymanId,
      page,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const orders = result.value.order

    return {
      orders: orders.map(OrderPresenter.toHTTP),
    }
  }
}
