import { app } from '@/app'
import { createAndAuthenticateOrg } from '@/utils/tests/create-and-athuenticate-org'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Search by city teste (e2e)', async () => {
  beforeAll(async () => {
    app.ready()
  })

  afterAll(async () => {
    app.close()
  })

  it('should be able to get pet by city ', async () => {
    const { token } = await createAndAuthenticateOrg(app, true)

    await request(app.server)
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

    const searchInCity = 'Manaus'

    const getByCityResponse = await request(app.server)
      .get(`/pets/city?city=${searchInCity}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(getByCityResponse.body.pets).toEqual([
      expect.objectContaining({ name: 'Theodoro Coelho' }),
    ])
  })
})
