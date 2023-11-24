import {
  BadRequestException,
  Body,
  Controller,
  Put,
  HttpCode,
  NotFoundException,
  Param,
} from '@nestjs/common'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { z } from 'zod'
import { EditRecipientUseCase } from '@/domain/delivery-management/application/use-cases-recipient/edit-recipient'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { RecipientPresenter } from '../../presenters/recipient-presenter'

const recipientParamsSchema = z.object({
  recipientId: z.string(),
})

const recipientBodySchema = z.object({
  name: z.string(),
  email: z.string(),
})

type RecipientParamsSchema = z.infer<typeof recipientParamsSchema>
type RecipientBodySchema = z.infer<typeof recipientBodySchema>

const validationPipe = new ZodValidationPipe(recipientParamsSchema)
const bodyValidationPipe = new ZodValidationPipe(recipientBodySchema)

@Controller('/recipient/edit/:recipientId')
export class EditRecipientController {
  constructor(private editRecipient: EditRecipientUseCase) {}

  @Put()
  @HttpCode(200)
  async handle(
    @Param(validationPipe) { recipientId }: RecipientParamsSchema,
    @Body(bodyValidationPipe) { name, email }: RecipientBodySchema,
  ) {
    const result = await this.editRecipient.execute({
      recipientId,
      name,
      email,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException()
        default:
          throw new BadRequestException()
      }
    }

    return { recipient: RecipientPresenter.toHTTP(result.value.recipient) }
  }
}
