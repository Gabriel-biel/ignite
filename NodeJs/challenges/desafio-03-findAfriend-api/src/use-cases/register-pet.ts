import { OrgsRepository } from '@/repositories/orgs-repository'
import { Pet, PetsRepository } from '@/repositories/pets-repository'
import { ResourceNotFoundError } from './errors/resource-not-found'

interface RegisterPetUseCaseRequest {
  id?: string
  name: string
  description: string
  age: 'Filhote' | 'Adolescente' | 'Adulto'
  size: 'Pequenino' | 'Medio' | 'Grande'
  energy_level: 'Baixa' | 'Medio' | 'Alto'
  independence_level: 'Baixo' | 'Medio' | 'Alto'
  ambience: 'Pequeno' | 'Amplo' | 'Grande'
  available: Date | null
  requirements?: {
    description: string
  }
  org_id: string
}
interface RegisterPetUseCaseResponse {
  pet: Pet
}

export class RegisterPetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    id,
    name,
    age,
    size,
    description,
    ambience,
    energy_level,
    independence_level,
    available,
    requirements,
    org_id,
  }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
    const org = await this.orgsRepository.findById(org_id)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    const pet = await this.petsRepository.create({
      id,
      name,
      age,
      size,
      description,
      ambience,
      energy_level,
      independence_level,
      available,
      requirements,
      org_id,
    })

    return { pet }
  }
}
