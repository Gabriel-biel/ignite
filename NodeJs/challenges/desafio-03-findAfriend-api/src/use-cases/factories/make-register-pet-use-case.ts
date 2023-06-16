import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { RegisterPetUseCase } from '../register-pet'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'

export function MakeRegisterPetUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const prismaOrgsRepository = new PrismaOrgsRepository()
  const registerPetUseCase = new RegisterPetUseCase(
    prismaOrgsRepository,
    prismaPetsRepository,
  )

  return registerPetUseCase
}
