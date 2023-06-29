import { app } from '@/app'
import { describe, it, beforeAll, afterAll, expect } from 'vitest'
import request from 'supertest'

describe('Register org test e2e', () => {
  beforeAll(() => {
    app.ready()
  })

  afterAll(() => {
    app.close()
  })

  it('Shoud be able to register org', async () => {
    const response = await request(app.server)
      .post('/orgs')
      .send({
        name: 'Org cats',
        email: 'orgcats@gmail.com',
        password: '123456',
        addresses: {
          city: 'Lábrea',
          street: 'Luiz Falcão',
          phone: '9898989898',
        },
      })

    expect(response.statusCode).toEqual(201)
  })
})
