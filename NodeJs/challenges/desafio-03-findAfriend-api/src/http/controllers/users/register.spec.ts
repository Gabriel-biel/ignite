import { describe, expect, afterAll, beforeAll, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
describe('Register User (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register user', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'Gabriel Lima',
      email: 'gabriel@gmail.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(201)
  })
})
