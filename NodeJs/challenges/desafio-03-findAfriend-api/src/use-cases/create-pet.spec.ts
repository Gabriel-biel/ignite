import { InMemoryPetsRepository } from '@/repositories/in-memory/in-Memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { describe, it, expect, beforeEach } from 'vitest'
import { CreatePetUseCase } from './create-pet'

let inMemoryPetsRepository: InMemoryPetsRepository
let inMemoryOrgsRepository: InMemoryOrgsRepository
let sut: CreatePetUseCase

describe('Create pets Use Case ', () => {
  beforeEach(() => {
    inMemoryOrgsRepository = new InMemoryOrgsRepository()
    inMemoryPetsRepository = new InMemoryPetsRepository()
    sut = new CreatePetUseCase(inMemoryPetsRepository, inMemoryOrgsRepository)
  })

  it('should be able to register pet', async () => {
    await inMemoryOrgsRepository.create({
      id: 'org-id',
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

    const { pet } = await sut.execute({
      type: 'Cat',
      race: 'Viralata',
      description: 'Gato resgatado das ruas',
      org_id: 'org-id',
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.org_id).toEqual(expect.any(String))
  })
})
