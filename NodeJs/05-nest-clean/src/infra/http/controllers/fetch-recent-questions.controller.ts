import { Controller, Get, HttpCode, Query, UseGuards } from '@nestjs/common'
import { PrismaService } from '@/infra/prisma/prisma.service'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))
const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

@Controller('/questions')
export class FetchRecentQuestionsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async handle(
    @Query('page', queryValidationPipe)
    page: PageQueryParamSchema,
  ) {
    const perPage = 20
    const questions = await this.prisma.question.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: perPage,
      skip: (page - 1) * page,
    })

    return { questions }
  }
}
