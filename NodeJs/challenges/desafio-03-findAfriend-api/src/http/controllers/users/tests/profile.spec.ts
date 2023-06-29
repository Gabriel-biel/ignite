import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { CreateAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'

describe('Profile test e2e', () => {
  beforeAll(() => {
    app.ready()
  })

  afterAll(() => {
    app.close()
  })

  it('Should be able to get profile user', async () => {
    const { token } = await CreateAndAuthenticateUser(app)

    const userResponse = await request(app.server)
      .get('/user/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(userResponse.statusCode).toEqual(200)
    expect(userResponse.body.user).toEqual(
      expect.objectContaining({
        email: 'gabriel@gmail.com',
      }),
    )
  })
})
