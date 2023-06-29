import {
  Pet,
  PetsRepository,
  searchPetsQuery,
} from '@/repositories/pets-repository'
import { ResourceNotFoundError } from './errors/resource-not-found'

interface SearchFilterUseCaseRequest {
  query: searchPetsQuery
  page: number
}

interface SearchFilterUseCaseResponse {
  pets: Pet[]
}

export class SearchPetFilterUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    query,
    page,
  }: SearchFilterUseCaseRequest): Promise<SearchFilterUseCaseResponse> {
    const pets = await this.petsRepository.searchMany(query, page)

    if (!pets) {
      throw new ResourceNotFoundError()
    }

    return { pets }
  }
}
