import { app } from '@/app'
import { describe, beforeAll, afterAll, it, expect } from 'vitest'
import request from 'supertest'

describe('Authenticate test e2e', () => {
  beforeAll(() => {
    app.ready()
  })

  afterAll(() => {
    app.close()
  })
  it('Should be able to authenticate', async () => {
    const email = 'gabriel@gmail.com'
    const password = '123456'

    await request(app.server).post('/users').send({
      name: 'Gabriel',
      email,
      password: '123456',
    })

    const authenticateResponse = await request(app.server)
      .post('/sessions/user')
      .send({
        email,
        password,
      })

    expect(authenticateResponse.statusCode).toEqual(200)
    expect(authenticateResponse.body).toEqual({ token: expect.any(String) })
  })
})
