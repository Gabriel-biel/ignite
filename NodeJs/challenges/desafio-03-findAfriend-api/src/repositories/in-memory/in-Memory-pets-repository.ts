import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: data.id ?? randomUUID(),
      org_id: data.org_id,
      type: data.type,
      race: data.race,
      city: data.city,
      description: data.description,
      available: data.available ? new Date(data.available) : null,
      created_at: new Date(),
    }

    this.items.push(pet)
    return pet
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async searchByCity(city: string): Promise<Pet[]> {
    return this.items.filter((item) => item.city === city)
  }

  async searchMany(query: string, page: number) {
    return this.items
      .filter((item) => item.description.includes(query))
      .slice((page - 1) * 10, page * 10)
  }
}
