import { DeliverOrderUseCase } from '@/domain/delivery-management/application/use-cases-order/deliver-order'
import {
  BadRequestException,
  Body,
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

const deliveryOrderBodySchema = z.string().array()

type DeliveryOrderParamsSchema = z.infer<typeof deliveryOrderParamsSchema>
type DeliveryOrderBodySchema = z.infer<typeof deliveryOrderBodySchema>

const validationPipe = new ZodValidationPipe(deliveryOrderParamsSchema)
const bodyValidationPipe = new ZodValidationPipe(deliveryOrderBodySchema)

@Controller('/orders/delivered/:orderId/:recipientId')
export class DeliverOrderController {
  constructor(private deliverOrder: DeliverOrderUseCase) {}

  @Put()
  @HttpCode(200)
  async handle(
    @Param(validationPipe) params: DeliveryOrderParamsSchema,
    @Body('attachments', bodyValidationPipe)
    attachmentsIds: DeliveryOrderBodySchema,
  ) {
    const { orderId, recipientId } = params

    const result = await this.deliverOrder.execute({
      orderId,
      recipientId,
      deliveredAt: new Date(),
      attachmentsIds,
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
