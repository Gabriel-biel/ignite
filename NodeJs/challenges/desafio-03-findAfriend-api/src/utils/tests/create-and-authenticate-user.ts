import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function CreateAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
) {
  const email = 'gabriel@gmail.com'
  const password = '123456'

  await request(app.server)
    .post('/users')
    .send({
      name: 'Gabriel Lima',
      email,
      password,
      role: isAdmin ? 'Admin' : 'Member',
    })

  const authResponse = await request(app.server)
    .post('/sessions/user')
    .send({ email, password })

  const { token } = authResponse.body

  return { token }
}
