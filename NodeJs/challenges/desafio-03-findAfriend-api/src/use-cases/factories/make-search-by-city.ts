import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { SearchPetByCityUseCase } from '../search-pet-by-city'

export function MakeSearchByCity() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const searchByCityUseCase = new SearchPetByCityUseCase(prismaPetsRepository)

  return searchByCityUseCase
}
