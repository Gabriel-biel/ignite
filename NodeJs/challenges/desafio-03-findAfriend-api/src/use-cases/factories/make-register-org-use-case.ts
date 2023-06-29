import { PrismaOrgsRepository } from '@/repositories/prismaRepository/prismaOrgsRepository'
import { RegisterOrgUseCase } from '../register-org'

export function MakeRegisterOrgUseCase() {
  const prismaOrgsRepository = new PrismaOrgsRepository()
  const registerOrgUseCase = new RegisterOrgUseCase(prismaOrgsRepository)

  return registerOrgUseCase
}
