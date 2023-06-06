import { InMemoryPetsRepository } from '@/repositories/in-memory/in-Memory-pets-repository'
import { it, describe, expect, beforeEach } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { GetPetProfileUseCase } from './get-pet-profile'
import { DataBaseInMemory } from '@/repositories/in-memory/database-in-memory'

let inMemoryDatabase: DataBaseInMemory
let inMemoryPetsRepository: InMemoryPetsRepository
let sut: GetPetProfileUseCase

describe('Get pet profile use case', () => {
  beforeEach(() => {
    inMemoryDatabase = new DataBaseInMemory()
    inMemoryPetsRepository = new InMemoryPetsRepository(inMemoryDatabase)
    sut = new GetPetProfileUseCase(inMemoryPetsRepository)
  })
  it('should be able to get pet profile', async () => {
    await inMemoryPetsRepository.create({
      name: 'Elliot',
      age: 'FILHOTE',
      porte: 'PEQUENINO',
      energy_level: 'ALTO',
      independence_level: 'BAIXA',
      environment: 'PEQUENO',
      requirements: {
        description: 'Necessita Atenção',
      },
      available: new Date(),
      org_id: 'org-id',
      description: 'Gato Adotado',
    })

    const createdPet = await inMemoryPetsRepository.create({
      id: 'Pet for tests TDD',
      name: 'Theodoro',
      age: 'FILHOTE',
      porte: 'PEQUENINO',
      energy_level: 'ALTO',
      independence_level: 'BAIXA',
      environment: 'PEQUENO',
      requirements: {
        description: 'Necessita Atenção',
      },
      available: new Date(),
      org_id: 'org-id',
      description: 'Gato resgatado das ruas',
    })

    const { pet } = await sut.execute({
      id: createdPet.id,
    })

    expect(inMemoryDatabase.pets).toHaveLength(2)
    expect(pet.id).toEqual('Pet for tests TDD')
  })

  it('should be able to get pet profile with wrong id', async () => {
    const inMemoryDatabase = new DataBaseInMemory()
    const inMemoryPetsRepository = new InMemoryPetsRepository(inMemoryDatabase)
    const sut = new GetPetProfileUseCase(inMemoryPetsRepository)

    expect(() => sut.execute({ id: 'non-existing-id' })).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })
})
