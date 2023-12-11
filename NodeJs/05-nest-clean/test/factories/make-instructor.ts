import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Instructor,
  InstructorProps,
} from '@/domain/forum/enterprise/entities/instructor'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { PrismaInstructorMapper } from '@/infra/database/prisma/mappers/prisma-instructor-mapper'

export function MakeInstructor(
  override: Partial<InstructorProps> = {},
  id?: UniqueEntityID,
) {
  const NewInstructor = Instructor.create(
    {
      name: faker.person.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: 'INSTRUCTOR',
      ...override,
    },
    id,
  )

  return NewInstructor
}

@Injectable()
export class InstructorFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaInstructor(
    data: Partial<InstructorProps> = {},
  ): Promise<Instructor> {
    const instructor = MakeInstructor(data)

    await this.prisma.user.create({
      data: PrismaInstructorMapper.toPrisma(instructor),
    })

    return instructor
  }
}
