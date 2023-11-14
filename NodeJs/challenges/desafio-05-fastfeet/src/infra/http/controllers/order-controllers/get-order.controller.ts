import { GetOrderUseCase } from '@/domain/delivery-management/application/use-cases-order/get-order'
import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  UnauthorizedException,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { OrderPresenter } from '../../presenters/order-presenter'

const getOrderParamsSchema = z.object({
  recipientId: z.string(),
  orderId: z.string(),
})

type GetOrderQuerySchema = z.infer<typeof getOrderParamsSchema>

const validationPipe = new ZodValidationPipe(getOrderParamsSchema)

@Controller('/orders/:orderId/:recipientId')
export class GetOrderController {
  constructor(private getOrder: GetOrderUseCase) {}

  @Get()
  @HttpCode(200)
  // fix-semantic: refactor this param for query
  async handle(
    @Param(validationPipe) { orderId, recipientId }: GetOrderQuerySchema,
  ) {
    // const { orderId, recipientId } = params

    const result = await this.getOrder.execute({
      orderId,
      recipientId,
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

    return { order: OrderPresenter.toHTTP(result.value.order) }
  }
}
