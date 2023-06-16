import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found'

interface GetPetProfileUseCaseRequest {
  petId: string
}

interface GetPetProfileUseCaseResponse {
  pet: Pet
}

export class GetPetProfileUseCase {
  constructor(private petRepository: PetsRepository) {}

  async execute({
    petId,
  }: GetPetProfileUseCaseRequest): Promise<GetPetProfileUseCaseResponse> {
    const pet = await this.petRepository.findById(petId)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return { pet }
  }
}
