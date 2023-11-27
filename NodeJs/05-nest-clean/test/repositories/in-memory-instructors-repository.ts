import { DomainEvents } from '@/core/events/domain-events'
import { InstructorRepository } from '@/domain/forum/aplication/repositories/instructor-repository'
import { Instructor } from '@/domain/forum/enterprise/entities/instructor'

export class InMemoryInstructorsRepository implements InstructorRepository {
  public items: Instructor[] = []

  async create(instructor: Instructor) {
    this.items.push(instructor)

    DomainEvents.dispatchEventsForAggregate(instructor.id)
  }

  async findByEmail(email: string) {
    const instructor = this.items.find((item) => item.email === email)

    if (!instructor) {
      return null
    }

    return instructor
  }
}
