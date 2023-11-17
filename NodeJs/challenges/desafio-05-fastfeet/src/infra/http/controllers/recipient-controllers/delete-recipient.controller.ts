import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  NotFoundException,
  Param,
} from '@nestjs/common'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { z } from 'zod'
import { DeleteRecipientUseCase } from '@/domain/delivery-management/application/use-cases-recipient/delete-recipient'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

const recipientParamsSchema = z.object({
  recipientId: z.string(),
})

type RecipientParamsSchema = z.infer<typeof recipientParamsSchema>

const validationPipe = new ZodValidationPipe(recipientParamsSchema)

@Controller('/recipient/delete/:recipientId')
export class DeleteRecipientController {
  constructor(private deleteRecipient: DeleteRecipientUseCase) {}

  @Delete()
  @HttpCode(200)
  async handle(@Param(validationPipe) { recipientId }: RecipientParamsSchema) {
    const result = await this.deleteRecipient.execute({ recipientId })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException()
        default:
          throw new BadRequestException()
      }
    }
  }
}
