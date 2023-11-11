import { DeliverOrderUseCase } from '@/domain/delivery-management/application/use-cases-order/deliver-order'
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  HttpCode,
  NotFoundException,
  Param,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

const deliveryOrderParamsSchema = z.object({
  orderId: z.string(),
  recipientId: z.string(),
})

const deliveryOrderBodySchema = z.string().array()

type DeliveryOrderParamsSchema = z.infer<typeof deliveryOrderParamsSchema>
type DeliveryOrderBodySchema = z.infer<typeof deliveryOrderBodySchema>

const validationPipe = new ZodValidationPipe(deliveryOrderParamsSchema)
const bodyValidationPipe = new ZodValidationPipe(deliveryOrderBodySchema)

@Controller('/orders/:orderId/:recipientId')
export class DeliverOrderController {
  constructor(private deliverOrder: DeliverOrderUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(
    @Param(validationPipe) { orderId, recipientId }: DeliveryOrderParamsSchema,
    @Body('attachments', bodyValidationPipe)
    attachmentsIds: DeliveryOrderBodySchema,
  ) {
    const result = await this.deliverOrder.execute({
      recipientId,
      orderId,
      deliveredAt: new Date(),
      attachmentsIds,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException()
        default:
          throw new BadRequestException()
      }
    }
  }
}
