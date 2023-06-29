import { app } from '@/app'
import { CreateAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'
import { describe, beforeAll, afterAll, it, expect } from 'vitest'
import request from 'supertest'

describe('Delete user test e2e', () => {
  beforeAll(() => {
    app.ready()
  })

  afterAll(() => {
    app.close()
  })

  it('Should be able to delete user', async () => {
    const { token } = await CreateAndAuthenticateUser(app, true)
    const responseUserProfile = await request(app.server)
      .get('/user/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    const userId = responseUserProfile.body.user.id

    const responseDeleteUser = await request(app.server)
      .delete(`/user/delete/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(responseDeleteUser.statusCode).toEqual(200)
  })
})
