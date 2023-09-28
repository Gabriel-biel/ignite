import { StudentRepository } from '@/domain/forum/aplication/repositories/student-repository'
import { Student } from '@/domain/forum/enterprise/entities/student'

export class InMemoryStudentsRepository implements StudentRepository {
  public items: Student[] = []

  async create(student: Student) {
    this.items.push(student)
  }

  async findByEmail(id: string) {
    const student = this.items.find((item) => item.email === id)

    if (!student) {
      return null
    }

    return student
  }
}
