import { app } from '@/app'
import { CreateAndAuthenticateOrg } from '@/utils/tests/create-and-authenticate-org'
import { describe, beforeAll, afterAll, it, expect } from 'vitest'
import request from 'supertest'

describe('Delete org test e2e', () => {
  beforeAll(() => {
    app.ready()
  })

  afterAll(() => {
    app.close()
  })

  it('should be able to delete org', async () => {
    const { token } = await CreateAndAuthenticateOrg(app, true)
    const responseOrgProfile = await request(app.server)
      .get('/org/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    const orgId = responseOrgProfile.body.org.id

    const responseDeleteOrg = await request(app.server)
      .delete(`/org/delete/${orgId}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(responseDeleteOrg.statusCode).toEqual(200)
  })
})
