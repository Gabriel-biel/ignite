import { app } from '@/app'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { createAndAuthenticateOrg } from '@/utils/tests/create-and-athuenticate-org'

describe('Get pet profile e2e', async () => {
  beforeAll(async () => {
    app.ready()
  })

  afterAll(async () => {
    app.close()
  })

  it('should be able to get pet profile', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    const createdPetResponse = await request(app.server)
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
        available: new Date(),
      })

    const petId = createdPetResponse.body.pet.id

    const getPetResponse = await request(app.server)
      .get(`/pets/${petId}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(getPetResponse.body.pet.id).toEqual(expect.any(String))
    expect(getPetResponse.body.pet).toEqual(
      expect.objectContaining({ name: 'Theodoro Coelho' }),
    )
  })
})
