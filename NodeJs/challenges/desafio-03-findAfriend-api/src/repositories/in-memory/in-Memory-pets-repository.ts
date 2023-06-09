import { Pet } from '@prisma/client'
import { IPets, PetsRepository, searchPetsQuery } from '../pets-repository'
import { randomUUID } from 'node:crypto'
import { DataBaseInMemory } from './database-in-memory'

export class InMemoryPetsRepository implements PetsRepository {
  constructor(private inMemoryDatabase: DataBaseInMemory) {}

  async create(data: IPets) {
    const pet = {
      id: data.id ?? randomUUID(),
      org_id: data.org_id,
      name: data.name,
      description: data.description,
      age: data.age,
      porte: data.porte,
      energy_level: data.energy_level,
      independence_level: data.independence_level,
      environment: data.environment,
      requirements: data.requirements,
      available: data.available ? new Date(data.available) : null,
      created_at: new Date(),
    }

    this.inMemoryDatabase.pets.push(pet)
    return pet
  }

  async findById(id: string) {
    const pet = this.inMemoryDatabase.pets.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async searchByCity(city: string) {
    const orgAddressInMemoryDatabase = this.inMemoryDatabase.addresses.filter(
      (address) => address.city === city,
    )

    const pets: Pet[] = []

    orgAddressInMemoryDatabase.forEach((org) => {
      const petsInOrg = this.inMemoryDatabase.pets.filter(
        (pet) => pet.org_id === org.org_id,
      )

      pets.push(...petsInOrg)
    })

    return pets
  }

  async searchMany(query: searchPetsQuery, page: number) {
    let pets: Pet[] = []

    // filtro por cidade
    const orgAddress = this.inMemoryDatabase.addresses.filter(
      (address) => address.city === query.city,
    )
    orgAddress.forEach((org) => {
      const petsInOrg = this.inMemoryDatabase.pets.filter(
        (pet) => pet.org_id === org.org_id,
      )

      pets.push(...petsInOrg)
    })
    //

    // filtrando por opcionais
    if (query.age) {
      pets = pets.filter((pet) => pet.age === query.age)
    }
    if (query.energy_level) {
      pets = pets.filter((pet) => pet.energy_level === query.energy_level)
    }
    if (query.independence_level) {
      pets = pets.filter(
        (pet) => pet.independence_level === query.independence_level,
      )
    }
    if (query.environment) {
      pets = pets.filter((pet) => pet.environment === query.environment)
    }
    if (query.porte) {
      pets = pets.filter((pet) => pet.porte === query.porte)
    }
    //

    return pets.slice((page - 1) * 20, page * 20)
  }
}
