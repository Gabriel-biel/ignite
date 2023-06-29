import { app } from '@/app'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { CreateAndAuthenticateOrg } from '@/utils/tests/create-and-authenticate-org'

describe('Fetch by fiter test e2e', () => {
  beforeAll(async () => {
    app.ready()
  })

  afterAll(async () => {
    app.close()
  })

  it('should be able to fetch pets by filter', async () => {
    const { token } = await CreateAndAuthenticateOrg(app, true)

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Theo',
        description: 'Retirado das ruas',
        age: 'Filhote',
        size: 'Pequenino',
        energy_level: 'Alto',
        independence_level: 'Baixo',
        ambience: 'Pequeno',
        available: new Date(),
        requirements: {
          description: 'Requer atenção',
        },
      })

    const cityByFilterPet = 'Lábrea'

    const fetchPetsResponse = await request(app.server)
      .get(`/pets/filter?city=${cityByFilterPet}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(fetchPetsResponse.body.pets).toEqual([
      expect.objectContaining({ name: 'Theo' }),
    ])
  })
})
