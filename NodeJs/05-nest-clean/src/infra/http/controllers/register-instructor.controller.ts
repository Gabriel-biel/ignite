import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { RegisterInstructorUseCase } from '@/domain/forum/application/use-cases/register-instructor'
import { InstructorAlreadyExistsError } from '@/domain/forum/application/use-cases/errors/instructor-already-exists-error'
import { Public } from '@/infra/auth/public'

const registerInstructorBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
})

type RegisterInstructorBodySchema = z.infer<typeof registerInstructorBodySchema>

@Controller('/accounts/instructor')
export class RegisterInstructorController {
  constructor(private registerInstructor: RegisterInstructorUseCase) {}

  @Post()
  @HttpCode(201)
  @Public()
  @UsePipes(new ZodValidationPipe(registerInstructorBodySchema))
  async handle(@Body() body: RegisterInstructorBodySchema) {
    const { name, email, password } = body

    const result = await this.registerInstructor.execute({
      name,
      email,
      password,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case InstructorAlreadyExistsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
