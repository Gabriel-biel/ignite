import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrg(
  app: FastifyInstance,
  isAdmin = false,
) {
  await request(app.server)
    .post('/orgs')
    .send({
      title: 'Org-cats',
      description: 'Orgs for cats',
      email: 'org@gmail.com',
      password: '123456',
      addresses: {
        city: 'Manaus',
        street: 'Jorge Teixeira',
        phone: '9797979797',
      },
    })

  const authReponse = await request(app.server).post('/sessions/orgs').send({
    email: 'org@gmail.com',
    password: '123456',
  })

  const { token } = authReponse.body

  return { token }
}
