import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetPetProfileUseCase } from '../get-pet-profile'

export function MakeGetPetProfile() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const getPetProfileUseCase = new GetPetProfileUseCase(prismaPetsRepository)

  return getPetProfileUseCase
}
