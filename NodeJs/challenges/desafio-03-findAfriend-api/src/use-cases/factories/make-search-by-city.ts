import { PrismaPetsRepository } from '@/repositories/prismaRepository/prismaPetsRepository'
import { SearchPetByCityUseCase } from '../search-pet-by-city'

export function MakeSearchByCity() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const searchPetByCityUseCase = new SearchPetByCityUseCase(
    prismaPetsRepository,
  )

  return searchPetByCityUseCase
}
