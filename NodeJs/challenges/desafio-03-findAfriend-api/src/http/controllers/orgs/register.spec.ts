import { describe, expect, afterAll, beforeAll, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
describe('Register Org (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register org', async () => {
    const response = await request(app.server)
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

    expect(response.statusCode).toEqual(201)
  })
})
