import { InMemoryPetsRepository } from '@/repositories/in-memory/in-Memory-pets-repository'
import { describe, it, beforeEach, expect } from 'vitest'
import { SearchPetByCityUseCase } from './search-pet-by-city'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { DataBaseInMemory } from '@/repositories/in-memory/database-in-memory'

let inMemoryPetsRepository: InMemoryPetsRepository
let inMemoryDatabase: DataBaseInMemory
let inMemoryOrgsRepository: InMemoryOrgsRepository
let sut: SearchPetByCityUseCase

describe('Search pet by city use case', () => {
  beforeEach(() => {
    inMemoryDatabase = new DataBaseInMemory()
    inMemoryPetsRepository = new InMemoryPetsRepository(inMemoryDatabase)
    inMemoryOrgsRepository = new InMemoryOrgsRepository(inMemoryDatabase)
    sut = new SearchPetByCityUseCase(inMemoryPetsRepository)
  })
  it('should be able to get list the pets for city', async () => {
    const org = await inMemoryOrgsRepository.create({
      title: 'Cats Org',
      description: 'Org for cats',
      email: 'org@gmail.com',
      password_hash: '123456',
      role: 'ADMIN',
      addresses: {
        city: 'Lábrea',
        street: 'Rua São Lazaro',
        phone: '98989898',
      },
    })

    await inMemoryPetsRepository.create({
      id: 'Pet one for test',
      name: 'Gabs',
      age: 'FILHOTE',
      porte: 'PEQUENINO',
      energy_level: 'ALTO',
      independence_level: 'BAIXA',
      environment: 'PEQUENO',
      requirements: {
        description: 'Necessita Atenção',
      },
      available: new Date(),
      org_id: org.id,
      description: 'Gato resgatado das ruas',
    })

    const { pets } = await sut.execute({
      city: 'Lábrea',
    })

    expect(inMemoryDatabase.pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ name: 'Gabs' })])
  })
})
