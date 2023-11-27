import { Instructor } from '../../enterprise/entities/instructor'

export abstract class InstructorRepository {
  abstract create(instructor: Instructor): Promise<void>
  abstract findByEmail(email: string): Promise<Instructor | null>
}
