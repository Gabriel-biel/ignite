import { Controller, Get, HttpCode, Query, UseGuards } from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { FetchRecentQuestionsUseCase } from '@/domain/forum/aplication/use-cases/fetch-recents-questions'
import { QuestionsPresenter } from '../presenters/question-presenter'

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
  constructor(private fetchRecentQuestions: FetchRecentQuestionsUseCase) {}

  @Get()
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async handle(
    @Query('page', queryValidationPipe)
    page: PageQueryParamSchema,
  ) {
    const result = await this.fetchRecentQuestions.execute({ page })

    if (result.isLeft()) {
      throw new Error()
    }

    const questions = result.value.questions

    return { questions: questions.map(QuestionsPresenter.toHttp) }
  }
}
