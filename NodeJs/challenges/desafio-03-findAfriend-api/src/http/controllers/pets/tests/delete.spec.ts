import { app } from '@/app'
import { describe, beforeAll, afterAll, it, expect } from 'vitest'
import request from 'supertest'
import { CreateAndAuthenticateOrg } from '@/utils/tests/create-and-authenticate-org'

describe('Delete pet test e2e', () => {
  beforeAll(() => {
    app.ready()
  })

  afterAll(() => {
    app.close()
  })

  it('should be able to delete a especific pet by id', async () => {
    const { token } = await CreateAndAuthenticateOrg(app, true)

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        id: 'Pet-for-test',
        name: 'Theodoro dogs',
        description: 'Retirado das ruas',
        age: 'Adolescente',
        size: 'Medio',
        energy_level: 'Medio',
        independence_level: 'Medio',
        ambience: 'Amplo',
        available: new Date(),
        requirements: {
          description: 'Necessita de banho, Precisa de espaço',
        },
      })

    const responseDeletePet = await request(app.server)
      .delete(`/pet/delete/${'Pet-for-test'}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(responseDeletePet.statusCode).toEqual(200)
  })
})
