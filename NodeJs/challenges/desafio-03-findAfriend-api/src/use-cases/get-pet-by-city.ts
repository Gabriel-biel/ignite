import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface GetPetByCityUseCaseRequest {
  city: string
}

interface GetPetByCityUseCaseResponse {
  pets: Pet[]
}

export class GetPetByCityUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
  }: GetPetByCityUseCaseRequest): Promise<GetPetByCityUseCaseResponse> {
    const pets = await this.petsRepository.searchByCity(city)

    return { pets }
  }
}
