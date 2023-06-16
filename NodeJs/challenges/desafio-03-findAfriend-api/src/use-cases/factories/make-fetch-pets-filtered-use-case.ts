import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchPetsFilterUseCase } from '../fetch-pets-filter'

export function MakeFetchPetsFiltered() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const getPetsDescriptionUseCase = new FetchPetsFilterUseCase(
    prismaPetsRepository,
  )

  return getPetsDescriptionUseCase
}
