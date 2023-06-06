import { Pet } from '@prisma/client'
import { IPets, PetsRepository } from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: IPets) {
    const pet = await prisma.pet.create({
      data: {
        name: data.name,
        age: data.age,
        description: data.description,
        porte: data.porte,
        environment: data.environment,
        independence_level: data.independence_level,
        energy_level: data.energy_level,
        pictures: {
          create: {
            name: data.name,
          },
        },
        org_id: data.org_id,
        requirements: {
          create: {
            description: data.requirements.description,
          },
        },
      },
    })

    return pet
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async searchByCity(city: string) {
    const pets = await prisma.pet.findMany({
      where: {
        org: {
          addresses: {
            every: {
              city,
            },
          },
        },
      },
    })
    return pets
  }

  async searchMany(query: string, page: number) {
    const pets = await prisma.pet.findMany({
      where: {
        description: {
          contains: query,
        },
      },
      take: 10,
      skip: (page - 1) * 10,
    })

    return pets
  }
}
