import { PetsRepository, searchPetsQuery } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found'

interface FetchPetsFilterUseCaseRequest {
  query: searchPetsQuery
  page: number
}

interface FetchPetsFilterUseCaseResponse {
  pets: Pet[]
}

export class FetchPetsFilterUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    query,
    page,
  }: FetchPetsFilterUseCaseRequest): Promise<FetchPetsFilterUseCaseResponse> {
    const pets = await this.petsRepository.searchMany(query, page)

    if (!pets) {
      throw new ResourceNotFoundError()
    }

    return { pets }
  }
}
