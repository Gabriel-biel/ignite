import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
} from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/get-question-by-slug'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { QuestionsDetailsPresenter } from '../presenters/question-details-presenter'

const getQuestionParamSchema = z.object({
  slug: z.string(),
})
const paramValidationPipe = new ZodValidationPipe(getQuestionParamSchema)

type GetQuestionParamSchema = z.infer<typeof getQuestionParamSchema>

@Controller('/questions/:slug')
export class GetQuestionBySlugController {
  constructor(private getQuestionBySlug: GetQuestionBySlugUseCase) {}

  @Get()
  @HttpCode(200)
  async handle(
    @Param(paramValidationPipe)
    { slug }: GetQuestionParamSchema,
  ) {
    const result = await this.getQuestionBySlug.execute({ slug })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException()
        default:
          throw new BadRequestException()
      }
    }

    return { question: QuestionsDetailsPresenter.toHttp(result.value.question) }
  }
}
