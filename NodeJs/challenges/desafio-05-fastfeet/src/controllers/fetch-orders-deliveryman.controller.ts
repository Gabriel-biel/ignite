import { Controller, UseGuards, Get, Query } from '@nestjs/common'
import { getDefaultAutoSelectFamilyAttemptTimeout } from 'net'
import { CurrentUser } from '@/auth/current-user-decorator'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { UserPayload } from '@/auth/jwt.strategy'
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe'
import { PrismaService } from '@/prisma/prisma.service'
import { z } from 'zod'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

@Controller('/deliveryman/orders')
@UseGuards(JwtAuthGuard)
export class FetchOrdersDeliverymanController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async handle(
    @Query('page', queryValidationPipe) page: PageQueryParamSchema,
    @CurrentUser() user: UserPayload,
  ) {
    const deliverymanId = user.sub
    const perpage = 5

    const orders = await this.prisma.order.findMany({
      where: {
        pickupAvailableOrder: '2023-07-22T04:00:00.000Z',
      },
      take: perpage,
      skip: (page - 1) * perpage,
      orderBy: {
        createdAt: 'desc',
      },
    })

    return {
      orders,
    }
  }
}
