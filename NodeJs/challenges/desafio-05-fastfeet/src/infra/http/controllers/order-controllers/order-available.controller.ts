import { OrderAvailableUseCase } from '@/domain/delivery-management/application/use-cases-order/order-available'
import {
  BadRequestException,
  Controller,
  HttpCode,
  NotFoundException,
  Param,
  Put,
  UnauthorizedException,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

const deliveryOrderParamsSchema = z.object({
  orderId: z.string(),
  recipientId: z.string(),
})

type DeliveryOrderParamsSchema = z.infer<typeof deliveryOrderParamsSchema>

const validationPipe = new ZodValidationPipe(deliveryOrderParamsSchema)

@Controller('/orders/available/:orderId/:recipientId')
export class OrderAvailableController {
  constructor(private orderAvailable: OrderAvailableUseCase) {}

  @Put()
  @HttpCode(200)
  async handle(@Param(validationPipe) params: DeliveryOrderParamsSchema) {
    const { orderId, recipientId } = params

    const result = await this.orderAvailable.execute({
      orderId,
      recipientId,
      pickupAvailableOrder: new Date(),
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException()
        case NotAllowedError:
          throw new UnauthorizedException()
        default:
          throw new BadRequestException()
      }
    }
  }
}
