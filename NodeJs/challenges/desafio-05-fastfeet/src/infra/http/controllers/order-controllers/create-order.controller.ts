import {
  Controller,
  Post,
  Body,
  Query,
  BadRequestException,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { RegisterOrderUseCase } from '@/domain/delivery-management/application/use-cases-order/register-order'

const createOrderBodySchema = z.object({
  addressId: z.string(),
})

const createOrderQuerySchema = z.string()

type CreateOrderBodySchema = z.infer<typeof createOrderBodySchema>
type CreateOrderQuerySchema = z.infer<typeof createOrderQuerySchema>

const validationPipeBody = new ZodValidationPipe(createOrderBodySchema)
const validationPipe = new ZodValidationPipe(createOrderQuerySchema)

@Controller('/orders')
export class CreateOrderController {
  constructor(private createOrder: RegisterOrderUseCase) {}

  @Post()
  async handle(
    @Body(validationPipeBody) { addressId }: CreateOrderBodySchema,
    @Query('recipientId', validationPipe) recipientId: CreateOrderQuerySchema,
  ) {
    const result = await this.createOrder.execute({
      recipientId,
      addressId,
    })

    if (result.isLeft()) {
      return new BadRequestException()
    }
  }
}
