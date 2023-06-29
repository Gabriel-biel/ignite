import { app } from '@/app'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'

describe('Refresh token test e2e', () => {
  beforeAll(() => {
    app.ready()
  })

  afterAll(() => {
    app.close()
  })

  it('Should be able to refresh a token', async () => {
    await request(app.server)
      .post('/orgs')
      .send({
        name: 'Org cats',
        email: 'orgcats@gmail.com',
        password: '123456',
        addresses: {
          city: 'Lábrea',
          street: 'Gabs street',
          phone: '9999999999',
        },
      })

    const responseOrgAuthenticate = await request(app.server)
      .post('/sessions/org')
      .send({
        email: 'orgcats@gmail.com',
        password: '123456',
      })

    const cookies = responseOrgAuthenticate.get('Set-Cookie')

    const refreshTokenResponse = await request(app.server)
      .patch('/org/refresh')
      .set('Cookie', cookies)
      .send()

    expect(refreshTokenResponse.statusCode).toEqual(200)
    expect(refreshTokenResponse.body).toEqual({ token: expect.any(String) })
    expect(refreshTokenResponse.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
