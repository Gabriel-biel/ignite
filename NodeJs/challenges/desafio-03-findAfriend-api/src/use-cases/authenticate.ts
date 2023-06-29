import { Org, OrgsRepository } from '@/repositories/orgs-repository'
import { User, UsersRepository } from '@/repositories/users-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials'
import { compare } from 'bcryptjs'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}
interface AuthenticateUseCaseResponse {
  userAuth: User | Org
}

export class AuthenticateUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)
    const org = await this.orgsRepository.findByEmail(email)
    const userAuth = user ?? org

    if (!userAuth) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, userAuth.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return { userAuth }
  }
}
