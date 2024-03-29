import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt-strategy'
import { EditAnswerUseCase } from '@/domain/forum/application/use-cases/edit-answer'

const editAnswerBodySchema = z.object({
  content: z.string(),
  attachments: z.array(z.string().uuid()).default([]),
})

type EditAnswerBodySchema = z.infer<typeof editAnswerBodySchema>

const zodValidationPipe = new ZodValidationPipe(editAnswerBodySchema)

@Controller('/answer/:answerId')
export class EditAnswerController {
  constructor(private editAnswer: EditAnswerUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(zodValidationPipe) body: EditAnswerBodySchema,
    @CurrentUser() user: UserPayload,
    @Param('answerId') answerId: string,
  ) {
    const { content, attachments } = body
    const userId = user.sub

    const result = await this.editAnswer.execute({
      authorId: userId,
      answerId,
      content,
      attachmentsIds: attachments,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
