import { UseCaseError } from '@/core/errors/use-case-erro'

export class InstructorAlreadyExistsError
  extends Error
  implements UseCaseError
{
  constructor(identifier: string) {
    super(`Instructor "${identifier}" alread exists`)
  }
}
