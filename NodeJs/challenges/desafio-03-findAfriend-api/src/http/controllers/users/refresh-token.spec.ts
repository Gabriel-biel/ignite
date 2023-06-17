import request from 'supertest'
import { app } from '@/app'
import { describe, expect, it, afterAll, beforeAll } from 'vitest'

describe('Refresh token test e2e', async () => {
  beforeAll(async () => {
    app.ready()
  })

  afterAll(async () => {
    app.close()
  })

  it('should be able to refresh a token', async () => {
    await request(app.server).post('/users').send({
      name: 'Gabriel lima',
      email: 'gabriel@gmail.com',
      password: '123456',
    })

    const authResponse = await request(app.server)
      .post('/sessions/users')
      .send({
        email: 'gabriel@gmail.com',
        password: '123456',
      })

    const cookies = authResponse.get('Set-Cookie')

    const refreshTokenResponse = await request(app.server)
      .patch('/users/refresh')
      .set('Cookie', cookies)
      .send()

    expect(refreshTokenResponse.statusCode).toEqual(200)
    expect(refreshTokenResponse.body).toEqual({ token: expect.any(String) })
    expect(refreshTokenResponse.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
