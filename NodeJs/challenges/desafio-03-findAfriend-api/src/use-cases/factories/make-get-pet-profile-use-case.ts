import { PrismaPetsRepository } from '@/repositories/prismaRepository/prismaPetsRepository'
import { GetPetProfileUseCase } from '../get-profile-pet'

export function MakeGetPetProfileUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const getPetProfileUseCase = new GetPetProfileUseCase(prismaPetsRepository)

  return getPetProfileUseCase
}
