import { DatabaseInMemory } from '@/repositories/inMemory/database-in-memory'
import { InMemoryOrgsRepository } from '@/repositories/inMemory/in-memory-org-repositories'
import { InMemoryPetsRepository } from '@/repositories/inMemory/in-memory-pets-repository'
import { describe, it, expect, beforeEach } from 'vitest'
import { GetPetProfileUseCase } from '../get-profile-pet'

let inMemoryDatabase: DatabaseInMemory
let inMemoryPetsRepository: InMemoryPetsRepository
let inMemoryOrgsRepository: InMemoryOrgsRepository
let sut: GetPetProfileUseCase

describe('Get profile pet test use case', () => {
  beforeEach(() => {
    inMemoryDatabase = new DatabaseInMemory()
    inMemoryPetsRepository = new InMemoryPetsRepository(inMemoryDatabase)
    inMemoryOrgsRepository = new InMemoryOrgsRepository(inMemoryDatabase)
    sut = new GetPetProfileUseCase(inMemoryPetsRepository)
  })

  it('Should be to able to get pet profile', async () => {
    await inMemoryOrgsRepository.create({
      id: 'org-id',
      name: 'Orgnization for Cats',
      email: 'organization@gmail.com',
      password_hash: '123456',
      description: 'Organização feita para abrigar gatos.',
    })

    const createdPet = await inMemoryPetsRepository.create({
      name: 'Eliot',
      age: 'Filhote',
      size: 'Pequenino',
      ambience: 'Pequeno',
      description: 'Removido das ruas',
      energy_level: 'Alto',
      independence_level: 'Alto',
      requirements: ['Necessita de atenção', 'Precisa de banho repentino'],
      org_id: 'org-id',
    })

    const { pet } = await sut.execute({ petId: createdPet.id })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.name).toEqual(expect.stringMatching('Eliot'))
  })
})
