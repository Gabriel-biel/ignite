import { PrismaPetsRepository } from '@/repositories/prismaRepository/prismaPetsRepository'
import { SearchPetFilterUseCase } from '../search-pet-by-filter'

export function MakeSearchPetsFiltered() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const getPetsDescriptionUseCase = new SearchPetFilterUseCase(
    prismaPetsRepository,
  )

  return getPetsDescriptionUseCase
}
