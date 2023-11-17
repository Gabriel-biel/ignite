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
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { RecipientPresenter } from '../../presenters/recipient-presenter'
import { ChooseNameRecipientUseCase } from '@/domain/delivery-management/application/use-cases-recipient/choose-name-recipient'

const recipientParamsSchema = z.object({
  recipientId: z.string(),
})

const recipientBodySchema = z.object({
  name: z.string(),
})

type RecipientParamsSchema = z.infer<typeof recipientParamsSchema>
type RecipientBodySchema = z.infer<typeof recipientBodySchema>

const validationPipe = new ZodValidationPipe(recipientParamsSchema)
const bodyValidationPipe = new ZodValidationPipe(recipientBodySchema)

@Controller('/recipient/profile/newName/:recipientId')
export class ChooseRecipientNameController {
  constructor(private chooseNameRecipient: ChooseNameRecipientUseCase) {}

  @Put()
  @HttpCode(200)
  async handle(
    @Param(validationPipe) { recipientId }: RecipientParamsSchema,
    @Body(bodyValidationPipe) { name }: RecipientBodySchema,
  ) {
    const result = await this.chooseNameRecipient.execute({
      recipientId,
      name,
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
