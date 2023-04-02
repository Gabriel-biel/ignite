import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UsersAlreadyExistsError } from './errors/user-already-exists-error'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6)

    const userwithSameEmail = await this.usersRepository.findByEmail(email)

    if (userwithSameEmail) {
      throw new UsersAlreadyExistsError()
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
