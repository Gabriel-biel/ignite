import { InstructorRepository } from '@/domain/forum/aplication/repositories/instructor-repository'
import { Instructor } from '@/domain/forum/enterprise/entities/instructor'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaInstructorMapper } from '../mappers/prisma-instructor-mapper'

@Injectable()
export class PrismaInstructorRepository implements InstructorRepository {
  constructor(private prisma: PrismaService) {}

  async create(instructor: Instructor) {
    const data = PrismaInstructorMapper.toPrisma(instructor)

    await this.prisma.user.create({
      data,
    })
  }

  async findByEmail(email: string): Promise<Instructor | null> {
    const instructor = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!instructor) {
      return null
    }

    return PrismaInstructorMapper.toDomain(instructor)
  }
}
