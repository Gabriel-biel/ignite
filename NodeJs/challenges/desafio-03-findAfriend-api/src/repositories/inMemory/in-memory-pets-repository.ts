import { randomUUID } from 'node:crypto'
import {
  CreatedPet,
  Pet,
  PetsRepository,
  searchPetsQuery,
} from '../pets-repository'
import { DatabaseInMemory } from './database-in-memory'

export class InMemoryPetsRepository implements PetsRepository {
  constructor(private inMemoryDatabase: DatabaseInMemory) {}

  async create(data: CreatedPet) {
    const pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      description: data.description,
      age: data.age,
      size: data.size,
      energy_level: data.energy_level,
      independence_level: data.independence_level,
      ambience: data.ambience,
      available: data.available ? new Date(data.available) : null,
      requirements: data.requirements,
      org_id: data.org_id,
    }

    this.inMemoryDatabase.pets.push(pet)

    return pet
  }

  async findById(id: string) {
    const pet = this.inMemoryDatabase.pets.find((pet) => pet.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async searchByCity(city: string) {
    const orgAddressInMemoryDatabase = this.inMemoryDatabase.address.filter(
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
    const orgAddress = this.inMemoryDatabase.address.filter(
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
    if (query.ambience) {
      pets = pets.filter((pet) => pet.ambience === query.ambience)
    }
    if (query.size) {
      pets = pets.filter((pet) => pet.size === query.size)
    }
    //

    return pets.slice((page - 1) * 20, page * 20)
  }

  async delete(id: string) {
    this.inMemoryDatabase.pets = this.inMemoryDatabase.pets.filter(
      (pet) => pet.id !== id,
    )
  }
}
