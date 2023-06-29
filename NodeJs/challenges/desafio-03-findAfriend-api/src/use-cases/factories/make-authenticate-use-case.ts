import { PrismaUsersRepository } from '@/repositories/prismaRepository/prismaUsersRepository'
import { AuthenticateUseCase } from '../authenticate'
import { PrismaOrgsRepository } from '@/repositories/prismaRepository/prismaOrgsRepository'

export function MakeAuthenticateUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const prismaOrgsRepository = new PrismaOrgsRepository()
  const authenticateUseCase = new AuthenticateUseCase(
    prismaUsersRepository,
    prismaOrgsRepository,
  )

  return authenticateUseCase
}
