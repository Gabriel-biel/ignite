import { app } from '@/app'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { CreateAndAuthenticateOrg } from '@/utils/tests/create-and-authenticate-org'

describe('Search by city teste (e2e)', async () => {
  beforeAll(async () => {
    app.ready()
  })

  afterAll(async () => {
    app.close()
  })

  it('should be able to get pet by city ', async () => {
    const { token } = await CreateAndAuthenticateOrg(app, true)

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Theodoro Coelho',
        description: 'Retirado das ruas',
        age: 'Filhote',
        size: 'Pequenino',
        energy_level: 'Alto',
        independence_level: 'Baixo',
        ambience: 'Pequeno',
        requirements: { description: 'Requer atenção' },
      })

    const searchInCity = 'Lábrea'

    const getByCityResponse = await request(app.server)
      .get(`/pets/city?city=${searchInCity}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(getByCityResponse.body.pets).toEqual([
      expect.objectContaining({ name: 'Theodoro Coelho' }),
    ])
  })
})
