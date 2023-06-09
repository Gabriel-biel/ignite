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
    await request(app.server)
      .post('/orgs')
      .send({
        title: 'Org-cats',
        description: 'Orgs for cats',
        email: 'org@gmail.com',
        password: '123456',
        addresses: {
          city: 'Manaus',
          street: 'Jorge Teixeira',
          phone: '9797979797',
        },
      })

    const response = await request(app.server).post('/sessions').send({
      email: 'org@gmail.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({ token: expect.any(String) })
  })
})
