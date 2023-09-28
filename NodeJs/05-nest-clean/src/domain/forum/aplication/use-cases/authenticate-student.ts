import { Either, left, rigth } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { StudentRepository } from '../repositories/student-repository'
import { HashCompare } from '../cryptography/hash-compare'
import { Encrypter } from '../cryptography/encypter'
import { WrongCredentialsError } from './errors/wrong-credentials-error'

export interface AuthenticateStudentUseCaseRequest {
  email: string
  password: string
}

export type AuthenticateStudentUseCaseResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string
  }
>

@Injectable()
export class AuthenticateStudentUseCase {
  constructor(
    private studentsRepository: StudentRepository,
    private hashCompare: HashCompare,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateStudentUseCaseRequest): Promise<AuthenticateStudentUseCaseResponse> {
    const student = await this.studentsRepository.findByEmail(email)

    if (!student) {
      return left(new WrongCredentialsError())
    }

    const hashedPassword = await this.hashCompare.compare(
      password,
      student.password,
    )

    if (!hashedPassword) {
      return left(new WrongCredentialsError())
    }

    const accessToken = await this.encrypter.encrypt({
      sub: student.id.toString(),
    })

    return rigth({ accessToken })
  }
}
