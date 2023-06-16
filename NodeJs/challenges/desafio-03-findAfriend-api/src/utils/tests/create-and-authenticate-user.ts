import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
) {
  await request(app.server)
    .post('/users')
    .send({
      name: 'Gabriel lima',
      email: 'gabriel@gmail.com',
      password: '123456',
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    })

  const authReponse = await request(app.server).post('/sessions/users').send({
    email: 'gabriel@gmail.com',
    password: '123456',
  })

  const { token } = authReponse.body
  return { token }
}
