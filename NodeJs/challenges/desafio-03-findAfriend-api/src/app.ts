import { fastifyJwt } from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import fastify from 'fastify'
import { env } from './env'
import { usersRoutes } from './http/controllers/users/routes'
import { ZodError } from 'zod'
import { orgRoutes } from './http/controllers/orgs/routes'
import { petsRoutes } from './http/controllers/pets/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false, // diz que o cookie não e assinado
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(fastifyCookie)

app.register(usersRoutes)
app.register(orgRoutes)
app.register(petsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error', issues: error.format })
  }

  if (env.NODE_ENV !== 'production') {
    console.log(error)
  } else {
    // Pegar erros por uma ferramenta de captura de erros
  }

  return reply.status(500).send({ message: 'Internal server error!' })
})
