import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function CreateAndAuthenticateOrg(
  app: FastifyInstance,
  isAdmin = false,
) {
  await request(app.server)
    .post('/orgs')
    .send({
      name: 'Org cats',
      email: 'orgcats@gmail.com',
      password: '123456',
      role: isAdmin ? 'Admin' : 'Member',
      addresses: {
        city: 'Lábrea',
        street: 'Luiz Falcão',
        phone: '9898989898',
      },
    })

  const authResponse = await request(app.server).post('/sessions/org').send({
    email: 'orgcats@gmail.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return { token }
}
