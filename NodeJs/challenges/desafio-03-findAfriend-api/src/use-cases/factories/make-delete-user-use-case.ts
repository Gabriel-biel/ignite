import { PrismaUsersRepository } from '@/repositories/prismaRepository/prismaUsersRepository'
import { DeleteUserUseCase } from '../delete-user'

export function MakeDeleteUserUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const deleteUserUseCase = new DeleteUserUseCase(prismaUsersRepository)

  return deleteUserUseCase
}
