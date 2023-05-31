import { Prisma, Pet } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
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
    // todo: fix-me
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
