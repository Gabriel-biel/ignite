import { OrderReturnUseCase } from '@/domain/delivery-management/application/use-cases-order/order-return'
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

const orderReturnedParamsSchema = z.object({
  orderId: z.string(),
  recipientId: z.string(),
})

type OrderReturnedParamsSchema = z.infer<typeof orderReturnedParamsSchema>

const validationPipe = new ZodValidationPipe(orderReturnedParamsSchema)

@Controller('/orders/returned/:orderId/:recipientId')
export class OrderReturnedController {
  constructor(private orderReturned: OrderReturnUseCase) {}

  @Put()
  @HttpCode(200)
  async handle(@Param(validationPipe) params: OrderReturnedParamsSchema) {
    const { orderId, recipientId } = params

    const result = await this.orderReturned.execute({
      orderId,
      recipientId,
      returnAt: new Date(),
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
