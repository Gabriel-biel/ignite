import { app } from '@/app'
import { createAndAuthenticateOrg } from '@/utils/tests/create-and-athuenticate-org'

import request from 'supertest'
import { describe, afterAll, beforeAll, expect, it } from 'vitest'

describe('Profile test (e2e)', () => {
  beforeAll(async () => {
    app.ready()
  })

  afterAll(async () => {
    app.close()
  })

  it('should be able to get org profile', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body.org).toEqual(
      expect.objectContaining({
        email: 'org@gmail.com',
      }),
    )
  })
})
