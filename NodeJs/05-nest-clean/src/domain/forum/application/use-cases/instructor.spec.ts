import { RegisterInstructorUseCase } from './register-instructor'
import { InMemoryInstructorsRepository } from 'test/repositories/in-memory-instructors-repository'
import { FakeHasher } from 'test/cryptography/fake-hasher'

let inMemoryInstructorsRepository: InMemoryInstructorsRepository
let fakeHasher: FakeHasher
let sut: RegisterInstructorUseCase // system under test

describe('Register Instructor', () => {
  beforeEach(() => {
    inMemoryInstructorsRepository = new InMemoryInstructorsRepository()
    fakeHasher = new FakeHasher()
    sut = new RegisterInstructorUseCase(
      inMemoryInstructorsRepository,
      fakeHasher,
    )
  })
  it('should be able to register a new instructor', async () => {
    const result = await sut.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123456',
    })

    expect(result.isRigth()).toBe(true)
    expect(result.value).toEqual({
      instructor: inMemoryInstructorsRepository.items[0],
    })
  })

  it('should hash instructor password upon registration ', async () => {
    const result = await sut.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123456',
    })

    const hashedPassword = await fakeHasher.hash('123456')

    expect(result.isRigth()).toBeTruthy()
    expect(inMemoryInstructorsRepository.items[0].password).toEqual(
      hashedPassword,
    )
  })
})
