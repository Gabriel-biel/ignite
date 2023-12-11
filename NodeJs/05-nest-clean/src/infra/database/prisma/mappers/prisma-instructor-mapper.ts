import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Instructor } from '@/domain/forum/enterprise/entities/instructor'
import { User as PrismaInstructor, Prisma } from '@prisma/client'

export class PrismaInstructorMapper {
  static toDomain(raw: PrismaInstructor): Instructor {
    return Instructor.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        role: raw.role,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(instructor: Instructor): Prisma.UserUncheckedCreateInput {
    return {
      id: instructor.id.toString(),
      name: instructor.name,
      email: instructor.email,
      password: instructor.password,
      role: instructor.role,
    }
  }
}
