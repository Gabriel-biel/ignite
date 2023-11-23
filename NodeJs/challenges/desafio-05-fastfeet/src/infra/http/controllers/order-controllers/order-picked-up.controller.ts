import { PickedUpOrderUseCase } from '@/domain/delivery-management/application/use-cases-order/picked-up-order'
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

const orderPickedupParamsSchema = z.object({
  orderId: z.string(),
  deliverymanId: z.string(),
})

type OrderPickedupParamsSchema = z.infer<typeof orderPickedupParamsSchema>

const validationPipe = new ZodValidationPipe(orderPickedupParamsSchema)

@Controller('/orders/pickedUp/:orderId/:deliverymanId')
export class OrderPickedUpController {
  constructor(private orderPickedup: PickedUpOrderUseCase) {}

  @Put()
  @HttpCode(201)
  async handle(@Param(validationPipe) params: OrderPickedupParamsSchema) {
    const { orderId, deliverymanId } = params

    const result = await this.orderPickedup.execute({
      orderId,
      deliverymanId,
      pickupAt: new Date(),
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
