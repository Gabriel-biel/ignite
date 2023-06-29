import { Pet, PetsRepository } from '@/repositories/pets-repository'

interface SearchPetByCityUseCaseRequest {
  city: string
}

interface SearchPetByCityUseCaseResponse {
  pets: Pet[]
}

export class SearchPetByCityUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
  }: SearchPetByCityUseCaseRequest): Promise<SearchPetByCityUseCaseResponse> {
    const pets = await this.petsRepository.searchByCity(city)

    return { pets }
  }
}
