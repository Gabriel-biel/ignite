import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { RegisterOrgUseCase } from '../register-org'

export function MakeRegisterOrgUseCase() {
  const prismaOrgRepository = new PrismaOrgsRepository()
  const registerOrguseCase = new RegisterOrgUseCase(prismaOrgRepository)

  return registerOrguseCase
}
