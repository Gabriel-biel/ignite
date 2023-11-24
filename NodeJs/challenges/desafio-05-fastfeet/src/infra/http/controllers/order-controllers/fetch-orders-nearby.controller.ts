import {
  Controller,
  Get,
  BadRequestException,
  Body,
  HttpCode,
} from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { FetchOrdersNearbyUseCase } from '@/domain/delivery-management/application/use-cases-order/fetch-orders-nearby'
import { OrderPresenter } from '../../presenters/order-presenter'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'

const ordersBodySchema = z.object({
  latitude: z.coerce.number().refine((value) => {
    return Math.abs(value) <= 90
  }),
  longitude: z.coerce.number().refine((value) => {
    return Math.abs(value) <= 180
  }),
})

type OrdersBodySchema = z.infer<typeof ordersBodySchema>

const bodyValidationPipe = new ZodValidationPipe(ordersBodySchema)

@Controller('/orders/nearby')
export class FetchOrdersNearbyController {
  constructor(private fetchOrdersNearby: FetchOrdersNearbyUseCase) {}

  @Get()
  @HttpCode(200)
  async handle(
    @Body(bodyValidationPipe) { latitude, longitude }: OrdersBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const deliverymanId = user.sub

    const result = await this.fetchOrdersNearby.execute({
      deliverymanId,
      accountLatitude: latitude,
      accountLongitude: longitude,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const orders = result.value.orders
    return {
      orders: orders.map(OrderPresenter.toHTTP),
    }
  }
}
