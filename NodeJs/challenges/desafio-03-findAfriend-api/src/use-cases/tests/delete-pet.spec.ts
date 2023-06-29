import { DatabaseInMemory } from '@/repositories/inMemory/database-in-memory'
import { InMemoryOrgsRepository } from '@/repositories/inMemory/in-memory-org-repositories'
import { InMemoryPetsRepository } from '@/repositories/inMemory/in-memory-pets-repository'
import { describe, it, expect, beforeEach } from 'vitest'
import { DeletePetUseCase } from '../delete-pet'

let inMemoryDatabase: DatabaseInMemory
let inMemoryPetsRepository: InMemoryPetsRepository
let inMemoryOrgsRepository: InMemoryOrgsRepository
let sut: DeletePetUseCase

describe('', () => {
  beforeEach(() => {
    inMemoryDatabase = new DatabaseInMemory()
    inMemoryPetsRepository = new InMemoryPetsRepository(inMemoryDatabase)
    inMemoryOrgsRepository = new InMemoryOrgsRepository(inMemoryDatabase)
    sut = new DeletePetUseCase(inMemoryPetsRepository)
  })
  it('should be able to delete a specifi pet', async () => {
    await inMemoryOrgsRepository.create({
      id: 'org-id',
      name: 'Home Cats',
      email: 'home@gmail.com',
      password_hash: '123456',
    })

    const createdPet = await inMemoryPetsRepository.create({
      name: 'Theo',
      description: 'Olá eu sou o theo',
      age: 'Filhote',
      size: 'Pequenino',
      energy_level: 'Alto',
      independence_level: 'Alto',
      ambience: 'Pequeno',
      available: new Date(),
      requirements: {
        description: 'Banho pelo menos 2x na semana Necessita rede nas janelas',
      },
      org_id: 'org-id',
    })

    await sut.execute({
      petId: createdPet.id,
    })

    const petExists = await inMemoryPetsRepository.findById(createdPet.id)

    expect(petExists).toEqual(null)
  })
})
