import { OrgsRepository } from '@/repositories/orgs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found'

interface RegisterPetUseCaseRequest {
  name: string
  description: string
  age: 'FILHOTE' | 'ADOLESCENTE' | 'ADULTO'
  porte: 'PEQUENINO' | 'MEDIO' | 'GRANDE'
  energy_level: 'BAIXA' | 'MEDIA' | 'ALTO'
  independence_level: 'BAIXA' | 'MEDIA' | 'ALTA'
  environment: 'PEQUENO' | 'GRANDE' | 'AMPLO'
  requirements: {
    description: string
  }
  available: Date | null
  org_id: string
}

interface RegisterPetUseCaseResponse {
  pet: Pet
}

export class RegisterPetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgRepository: OrgsRepository,
  ) {}

  async execute({
    name,
    age,
    porte,
    environment,
    energy_level,
    independence_level,
    available,
    requirements,
    description,
    org_id,
  }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
    const org = await this.orgRepository.findById(org_id)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    const pet = await this.petsRepository.create({
      name,
      age,
      porte,
      environment,
      energy_level,
      independence_level,
      available,
      requirements,
      description,
      org_id,
    })

    return { pet }
  }
}
