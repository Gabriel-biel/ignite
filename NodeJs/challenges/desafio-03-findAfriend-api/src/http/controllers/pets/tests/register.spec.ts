import { app } from '@/app'
import { CreateAndAuthenticateOrg } from '@/utils/tests/create-and-authenticate-org'
import { describe, beforeAll, afterAll, it, expect } from 'vitest'
import request from 'supertest'

describe('Register pet test e2e', () => {
  beforeAll(() => {
    app.ready()
  })

  afterAll(() => {
    app.close()
  })

  it('Should be able to register pet', async () => {
    const { token } = await CreateAndAuthenticateOrg(app, true)

    const responseRegisterPet = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        id: 'Register-PET-TEST-e2e',
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

    expect(responseRegisterPet.statusCode).toEqual(200)
  })
})
