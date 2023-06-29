import { prisma } from '@/lib/prisma'
import { CreatedPet, PetsRepository, searchPetsQuery } from '../pets-repository'
import { randomUUID } from 'crypto'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: CreatedPet) {
    const pet = await prisma.pet.create({
      data: {
        id: data.id ?? randomUUID(),
        name: data.name,
        age: data.age,
        size: data.size,
        description: data.description,
        ambience: data.ambience,
        energy_level: data.energy_level,
        independence_level: data.independence_level,
        available: data.available,
        org_id: data.org_id,
        Requirement: {
          create: {
            description: data.requirements?.description!,
          },
        },
      },
    })

    return pet
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async delete(id: string) {
    await prisma.pet.delete({
      where: {
        id,
      },
    })
  }

  async searchByCity(city: string) {
    const pets = await prisma.pet.findMany({
      where: {
        org: {
          Address: {
            every: {
              city,
            },
          },
        },
      },
    })

    return pets
  }

  async searchMany(query: searchPetsQuery, page: number) {
    const pets = await prisma.pet.findMany({
      where: {
        org: {
          Address: {
            every: { city: query.city },
          },
        },
        AND: {
          age: query.age,
          size: query.size,
          energy_level: query.energy_level,
          independence_level: query.independence_level,
          ambience: query.ambience,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return pets
  }
}
