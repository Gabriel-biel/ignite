import {
  Controller,
  HttpCode,
  BadRequestException,
  Patch,
  Param,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { AccountAlreadyExists } from '@/domain/delivery-management/application/errors/account-already-exists'
import { ReadNotificationUseCase } from '@/domain/notification/application/use-cases/read-notification'

const readNotificationParamSchema = z.object({
  recipientId: z.string(),
  notificationId: z.string(),
})

type ReadNotificationParamSchema = z.infer<typeof readNotificationParamSchema>

const validationPipe = new ZodValidationPipe(readNotificationParamSchema)

@Controller('/notifications/:notificationId/read/:recipientId')
export class ReadNotificationController {
  constructor(private readNotification: ReadNotificationUseCase) {}

  @Patch()
  @HttpCode(204)
  async handle(
    @Param(validationPipe)
    { notificationId, recipientId }: ReadNotificationParamSchema,
  ) {
    const result = await this.readNotification.execute({
      recipientId,
      notificationId,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case AccountAlreadyExists:
          throw new BadRequestException(error.message)
        default:
          throw new BadRequestException()
      }
    }
  }
}
