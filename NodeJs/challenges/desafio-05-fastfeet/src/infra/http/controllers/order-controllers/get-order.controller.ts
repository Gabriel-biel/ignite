import { GetOrderUseCase } from '@/domain/delivery-management/application/use-cases-order/get-order'
import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Query,
  UnauthorizedException,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { OrderDetailsPresenter } from '../../presenters/order-details'

const getOrderByIdQuerySchema = z.string()
const getOrderByRecipientIdSchema = z.string()

type GetOrderByIdQuerySchema = z.infer<typeof getOrderByIdQuerySchema>
type GetOrderByRecipientIdSchema = z.infer<typeof getOrderByRecipientIdSchema>

const orderIdValidationPipe = new ZodValidationPipe(getOrderByIdQuerySchema)
const recipientIdValidationPipe = new ZodValidationPipe(
  getOrderByRecipientIdSchema,
)

@Controller('/orders')
export class GetOrderController {
  constructor(private getOrder: GetOrderUseCase) {}

  @Get()
  @HttpCode(200)
  async handle(
    @Query('oderId', orderIdValidationPipe) orderId: GetOrderByIdQuerySchema,
    @Query('recipientId', recipientIdValidationPipe)
    recipientId: GetOrderByRecipientIdSchema,
  ) {
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

    return { order: OrderDetailsPresenter.toHTTP(result.value.order) }
  }
}
