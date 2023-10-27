import {
  Controller,
  Post,
  HttpCode,
  Body,
  Query,
  ConflictException,
  UsePipes,
} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { z } from 'zod'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'

const createOrderBodySchema = z.object({
  pickupAvailableOrder: z.date().optional(),
  pickupAt: z.date().optional(),
  deliveryAt: z.date().optional(),
  returnedAt: z.date().optional(),
  attachments: z.string().array().optional(),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()),
})

const createOrderQuerySchema = z.object({
  recipientId: z.string(),
  deliverymanId: z.string(),
  addressId: z.string(),
})

type createOrderQuerySchema = z.infer<typeof createOrderQuerySchema>
type CreateOrderBodySchema = z.infer<typeof createOrderBodySchema>

@Controller('/orders')
export class CreateAccountController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createOrderBodySchema))
  async handle(
    @Body() body: CreateOrderBodySchema,
    @Query() query: createOrderQuerySchema,
  ) {
    const {
      deliveryAt,
      pickupAt,
      returnedAt,
      pickupAvailableOrder,
      attachments,
      createdAt,
      updatedAt,
    } = body

    const { addressId, deliverymanId, recipientId } = query

    await this.prisma.order.create({
      data: {
        recipientId,
        deliveryAt,
        pickupAt,
        returnedAt,
        pickupAvailableOrder,
        attachments,
        createdAt,
        updatedAt,
      },
    })
  }
}
