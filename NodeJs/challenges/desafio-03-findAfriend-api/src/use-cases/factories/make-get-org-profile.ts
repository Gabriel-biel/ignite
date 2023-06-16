import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { GetOrgProfileUseCase } from '../get-org-profile'

export function MakeGetOrgProfile() {
  const prismaOrgRepository = new PrismaOrgsRepository()
  const getOrgProfile = new GetOrgProfileUseCase(prismaOrgRepository)

  return getOrgProfile
}
