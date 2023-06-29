import { DatabaseInMemory } from '@/repositories/inMemory/database-in-memory'
import { InMemoryPetsRepository } from '@/repositories/inMemory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterPetUseCase } from '../register-pet'
import { InMemoryOrgsRepository } from '@/repositories/inMemory/in-memory-org-repositories'

let inMemoryDatabase: DatabaseInMemory
let inMemoryPetsRepository: InMemoryPetsRepository
let inMemoryOrgsRepository: InMemoryOrgsRepository
let sut: RegisterPetUseCase

describe('Register pet test use case', () => {
  beforeEach(() => {
    inMemoryDatabase = new DatabaseInMemory()
    inMemoryPetsRepository = new InMemoryPetsRepository(inMemoryDatabase)
    inMemoryOrgsRepository = new InMemoryOrgsRepository(inMemoryDatabase)
    sut = new RegisterPetUseCase(inMemoryPetsRepository, inMemoryOrgsRepository)
  })

  it('should be able to register pet', async () => {
    await inMemoryOrgsRepository.create({
      id: 'org-id',
      name: 'Org DogsAndCats',
      email: 'dogsAndCats@gmail.com',
      password_hash: '123456',
      created_at: new Date(),
    })

    const { pet } = await sut.execute({
      name: 'Theo',
      description: 'Olá eu sou o theo',
      age: 'Filhote',
      size: 'Pequenino',
      energy_level: 'Alto',
      independence_level: 'Alto',
      ambience: 'Pequeno',
      available: new Date(),
      requirements: {
        description: 'Banho pelo menos 2x na semana',
      },
      org_id: 'org-id',
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.name).toEqual('Theo')
  })
})
