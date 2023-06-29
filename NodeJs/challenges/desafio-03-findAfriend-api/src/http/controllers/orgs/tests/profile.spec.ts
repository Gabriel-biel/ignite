import { app } from '@/app'
import { CreateAndAuthenticateOrg } from '@/utils/tests/create-and-authenticate-org'
import { describe, beforeAll, afterAll, it, expect } from 'vitest'
import request from 'supertest'

describe('Profile test e2e', () => {
  beforeAll(() => {
    app.ready()
  })
  afterAll(() => {
    app.close()
  })

  it('Should be able to get org profile', async () => {
    const { token } = await CreateAndAuthenticateOrg(app)

    const responseOrg = await request(app.server)
      .get('/org/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(responseOrg.statusCode).toEqual(200)
    expect(responseOrg.body.org).toEqual(
      expect.objectContaining({
        email: 'orgcats@gmail.com',
      }),
    )
  })
})
