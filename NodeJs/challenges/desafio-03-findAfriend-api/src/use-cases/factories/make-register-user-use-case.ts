import { PrismaUsersRepository } from '@/repositories/prismaRepository/prismaUsersRepository'
import { RegisterUserUseCase } from '../register-user'

export function MakeRegisterUserUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const registerUserUseCase = new RegisterUserUseCase(prismaUsersRepository)

  return registerUserUseCase
}
