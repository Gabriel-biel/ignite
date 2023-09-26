import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt-strategy'
import { CreateQuestionUseCase } from '@/domain/forum/aplication/use-cases/create-question'

const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
})

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>

@Controller('/questions')
export class CreateQuestionController {
  constructor(private createQuestion: CreateQuestionUseCase) {}

  @Post()
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  async handle(
    @Body(new ZodValidationPipe(createQuestionBodySchema))
    body: CreateQuestionBodySchema,
    @CurrentUser()
    user: UserPayload,
  ) {
    const { title, content } = body
    const userId = user.sub

    await this.createQuestion.execute({
      title,
      content,
      authorId: userId,
      attachmentsIds: [],
    })
  }
}
