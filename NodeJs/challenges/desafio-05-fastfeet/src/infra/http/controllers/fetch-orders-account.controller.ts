import { Controller, UseGuards, Get, Query } from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { z } from 'zod'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

@Controller('/orders/account')
@UseGuards(JwtAuthGuard)
export class FetchOrdersAccountController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async handle(
    @Query('page', queryValidationPipe) page: PageQueryParamSchema,
    @CurrentUser() user: UserPayload,
  ) {
    const accountId = user.sub
    console.log(`accountID= ${accountId}`)
    const perpage = 10

    const orders = await this.prisma.order.findMany({
      // Alert: Datatime in pickupAvailableOrder used for tests
      where: {
        pickupAvailableOrder: '2023-08-22T04:00:00.000Z',
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
