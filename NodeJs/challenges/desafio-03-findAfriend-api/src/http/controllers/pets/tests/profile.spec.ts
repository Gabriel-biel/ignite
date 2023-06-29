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

  it('Should be able to get pet profile', async () => {
    const { token } = await CreateAndAuthenticateOrg(app, true)

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        id: 'Pet-for-test',
        name: 'Theodoro cat',
        description: 'Retirado das ruas',
        age: 'Filhote',
        size: 'Pequenino',
        energy_level: 'Alto',
        independence_level: 'Baixo',
        ambience: 'Pequeno',
        available: new Date(),
        requirements: {
          description: 'Necessita de banho, Precisa de atenção',
        },
      })

    const responsePetProfile = await request(app.server)
      .get(`/pet/profile/${'Pet-for-test'}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(responsePetProfile.body.pet.id).toEqual(expect.any(String))
    expect(responsePetProfile.body.pet.id).toEqual('Pet-for-test')
  })
})
