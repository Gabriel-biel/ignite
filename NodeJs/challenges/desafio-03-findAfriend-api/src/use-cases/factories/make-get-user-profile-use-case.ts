import { PrismaUsersRepository } from '@/repositories/prismaRepository/prismaUsersRepository'
import { GetUserProfileUseCase } from '../get-profile-user'

export function MakeGetUserProfileUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const getUserProfileUseCase = new GetUserProfileUseCase(prismaUsersRepository)

  return getUserProfileUseCase
}
