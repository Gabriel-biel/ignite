import { Either, left, rigth } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { Instructor } from '../../enterprise/entities/instructor'
import { InstructorRepository } from '../repositories/instructor-repository'
import { HashGenerator } from '../cryptography/hash-generator'
import { InstructorAlreadyExistsError } from './errors/instructor-already-exists-error'

export interface RegisterInstructorUseCaseRequest {
  name: string
  email: string
  password: string
}

export type RegisterInstructorUseCaseResponse = Either<
  InstructorAlreadyExistsError,
  {
    instructor: Instructor
  }
>

@Injectable()
export class RegisterInstructorUseCase {
  constructor(
    private instructorsRepository: InstructorRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    email,
    password,
  }: RegisterInstructorUseCaseRequest): Promise<RegisterInstructorUseCaseResponse> {
    const instructorWithSameEmail =
      await this.instructorsRepository.findByEmail(email)

    if (instructorWithSameEmail) {
      return left(new InstructorAlreadyExistsError(email))
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const instructor = Instructor.create({
      name,
      email,
      password: hashedPassword,
    })

    await this.instructorsRepository.create(instructor)

    return rigth({ instructor })
  }
}
