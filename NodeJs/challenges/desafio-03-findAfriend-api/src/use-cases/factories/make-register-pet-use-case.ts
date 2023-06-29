import { PrismaPetsRepository } from '@/repositories/prismaRepository/prismaPetsRepository'
import { RegisterPetUseCase } from '../register-pet'
import { PrismaOrgsRepository } from '@/repositories/prismaRepository/prismaOrgsRepository'

export function MakeRegisterPetUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const prismaOrgsRepository = new PrismaOrgsRepository()
  const registerPetUseCase = new RegisterPetUseCase(
    prismaPetsRepository,
    prismaOrgsRepository,
  )

  return registerPetUseCase
}
