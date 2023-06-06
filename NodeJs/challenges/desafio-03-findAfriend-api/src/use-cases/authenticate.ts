import { OrgsRepository } from '@/repositories/orgs-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { compare } from 'bcryptjs'
import { Org, User } from '@prisma/client'
import { UsersRepository } from '@/repositories/users-repository'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}
interface AuthenticateUseCaseResponse {
  authUser: Org | User
}

export class AuthenticateUseCase {
  constructor(
    private orgsRepository: OrgsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const org = await this.orgsRepository.findByEmail(email)
    const user = await this.usersRepository.findByEmail(email)
    const authUser = org ?? user

    if (!authUser) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, authUser.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return { authUser }
  }
}
