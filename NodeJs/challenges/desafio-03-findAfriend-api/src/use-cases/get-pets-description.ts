import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found'

interface GetPetsDescriptionUseCaseRequest {
  query: string
  page: number
}
interface GetPetsDescriptionUseCaseResponse {
  pets: Pet[]
}

export class GetPetsDescriptionUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    query,
    page,
  }: GetPetsDescriptionUseCaseRequest): Promise<GetPetsDescriptionUseCaseResponse> {
    const pets = await this.petsRepository.searchMany(query, page)

    if (!pets) {
      throw new ResourceNotFoundError()
    }

    return { pets }
  }
}
