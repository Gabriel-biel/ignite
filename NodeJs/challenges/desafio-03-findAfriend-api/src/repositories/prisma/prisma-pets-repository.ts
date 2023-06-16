import { Pet } from '@prisma/client'
import { IPets, PetsRepository, searchPetsQuery } from '../pets-repository'
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
        available: data.available,
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

  async searchMany(query: searchPetsQuery, page: number) {
    const pets = await prisma.pet.findMany({
      include: {
        org: {
          include: {
            addresses: {
              where: {
                city: query.city,
              },
            },
          },
          select: {
            pets: {
              where: {
                age: query.age,
                energy_level: query.energy_level,
                independence_level: query.independence_level,
                environment: query.environment,
                porte: query.porte,
              },
            },
          },
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return pets
  }
}
