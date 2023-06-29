import { app } from '@/app'
import { describe, beforeAll, afterAll, it, expect } from 'vitest'
import request from 'supertest'

describe('Refresh Token test e2e', () => {
  beforeAll(() => {
    app.ready()
  })

  afterAll(() => {
    app.close()
  })
  it('Should be able to refresh a token', async () => {
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

    const cookies = authenticateResponse.get('Set-cookie')

    const refreshTokenResponse = await request(app.server)
      .patch('/user/refresh')
      .set('Cookie', cookies)
      .send()

    expect(refreshTokenResponse.statusCode).toEqual(200)
    expect(refreshTokenResponse.body).toEqual({ token: expect.any(String) })
    expect(refreshTokenResponse.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
