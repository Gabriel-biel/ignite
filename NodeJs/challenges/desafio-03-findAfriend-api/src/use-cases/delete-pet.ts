import { PetsRepository } from '@/repositories/pets-repository'
import { ResourceNotFoundError } from './errors/resource-not-found'

interface DeletePetUseCaseRequest {
  petId: string
}

export class DeletePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ petId }: DeletePetUseCaseRequest) {
    const pet = await this.petsRepository.findById(petId)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    await this.petsRepository.delete(pet.id)
  }
}
