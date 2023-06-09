import request from 'supertest'
import { app } from '@/app'
import { describe, expect, it, afterAll, beforeAll } from 'vitest'

describe('Atuhenticate test e2e', async () => {
  beforeAll(async () => {
    app.ready()
  })

  afterAll(async () => {
    app.close()
  })

  it('should be able authenticate', async () => {
    await request(app.server).post('/users').send({
      name: 'Gabriel lima',
      email: 'gabriel@gmail.com',
      password: '123456',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'gabriel@gmail.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({ token: expect.any(String) })
  })
})
