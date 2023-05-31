import { OrgsRepository } from '@/repositories/orgs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found'

interface CreatePetUseCaseRequest {
  type: string
  race: string
  description: string
  org_id: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgRepository: OrgsRepository,
  ) {}

  async execute({
    description,
    type,
    race,
    org_id,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const org = await this.orgRepository.findById(org_id)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    const pet = await this.petsRepository.create({
      type,
      race,
      description,
      org_id,
    })

    return { pet }
  }
}
