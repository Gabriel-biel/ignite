import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Create check-ins (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
  it('shuld be able to create a check-in', async () => {
    const { token } = await createAndAuthenticateUser(app)

    // Normalment evitamos esse tipo de criação por ser mais sucetivel a erros
    // mas farei assim para demonstrar que e totoalmente possivel criar uma gym diretamente
    const gym = await prisma.gym.create({
      data: {
        title: 'JavaScript Gym',
        latitude: -7.268306,
        longitude: -64.795441,
      },
    })

    // // // // //

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -7.268306,
        longitude: -64.795441,
      })

    expect(response.statusCode).toEqual(201)
  })
})
