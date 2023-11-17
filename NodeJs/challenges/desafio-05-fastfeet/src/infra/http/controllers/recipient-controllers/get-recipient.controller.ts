import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
} from '@nestjs/common'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { z } from 'zod'
import { GetRecipientUseCase } from '@/domain/delivery-management/application/use-cases-recipient/get-recipient'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { RecipientPresenter } from '../../presenters/recipient-presenter'

const recipientParamsSchema = z.object({
  recipientId: z.string(),
})

type RecipientParamsSchema = z.infer<typeof recipientParamsSchema>

const validationPipe = new ZodValidationPipe(recipientParamsSchema)

@Controller('/recipient/profile/:recipientId')
export class GetRecipientController {
  constructor(private getRecipient: GetRecipientUseCase) {}

  @Get()
  @HttpCode(200)
  async handle(@Param(validationPipe) { recipientId }: RecipientParamsSchema) {
    const result = await this.getRecipient.execute({ recipientId })

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
