import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetPetsDescriptionUseCase } from '../get-pets-description'

export function MakeGetPetsDescriptionUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const getPetsDescriptionUseCase = new GetPetsDescriptionUseCase(
    prismaPetsRepository,
  )

  return getPetsDescriptionUseCase
}
