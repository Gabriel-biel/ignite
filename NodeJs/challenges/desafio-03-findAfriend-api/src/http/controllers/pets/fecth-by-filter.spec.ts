import { app } from '@/app'
import { createAndAuthenticateOrg } from '@/utils/tests/create-and-athuenticate-org'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { FastifyRequest } from 'fastify'

describe('Fetch by fiter test e2e', () => {
  beforeAll(async () => {
    app.ready()
  })

  afterAll(async () => {
    app.close()
  })

  it('should be able to fetch pets by filter', async (req: FastifyRequest) => {
    const { token } = await createAndAuthenticateOrg(app)

    await request(app.server)
      .post('/org/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Theo',
        age: 'FILHOTE',
        description: 'Retirado das ruas',
        energy_level: 'ALTO',
        porte: 'PEQUENINO',
        environment: 'PEQUENO',
        requirements: { description: 'Requer atenção' },
        independence_level: 'BAIXA',
        available: new Date(),
      })

    const cityByFilterPet = 'Manaus'

    const fetchPetsResponse = await request(app.server)
      .get(`/pets?city=${cityByFilterPet}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(fetchPetsResponse.body.pets).toEqual([
      expect.objectContaining({ name: 'Theo' }),
    ])
  })
})
