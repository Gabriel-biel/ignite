import { PrismaOrgsRepository } from '@/repositories/prismaRepository/prismaOrgsRepository'
import { GetOrgProfileUseCase } from '../get-profile-org'

export function MakeGetOrgProfileUseCase() {
  const prismaOrgsRepository = new PrismaOrgsRepository()
  const getOrgProfileUseCase = new GetOrgProfileUseCase(prismaOrgsRepository)

  return getOrgProfileUseCase
}
