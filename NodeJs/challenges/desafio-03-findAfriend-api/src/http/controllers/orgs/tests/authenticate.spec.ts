import { app } from '@/app'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'

describe('Authenticate test e2e', () => {
  beforeAll(() => {
    app.ready()
  })

  afterAll(() => {
    app.close()
  })

  it('Should be able to authenticate to org', async () => {
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

    expect(responseOrgAuthenticate.statusCode).toEqual(200)
    expect(responseOrgAuthenticate.body).toEqual({ token: expect.any(String) })
  })
})
