import { app } from '@/app'
import { createAndAuthenticateOrg } from '@/utils/tests/create-and-athuenticate-org'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register Pet e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
  it('should be able to register pet', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    const registerPetResponse = await request(app.server)
      .post('/org/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Theodoro Coelho',
        age: 'FILHOTE',
        description: 'Retirado das ruas',
        energy_level: 'ALTO',
        porte: 'PEQUENINO',
        environment: 'PEQUENO',
        requirements: { description: 'Requer atenção' },
        independence_level: 'BAIXA',
      })

    expect(registerPetResponse.statusCode).toEqual(201)
  })
})
