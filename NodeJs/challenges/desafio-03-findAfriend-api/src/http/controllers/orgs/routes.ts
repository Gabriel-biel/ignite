import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { VerifyJwt } from '@/http/middlewares/verify-jwt'
import { refreshToken } from './refresh-token'

export async function orgRoutes(app: FastifyInstance) {
  app.post('/orgs', register)
  app.post('/sessions/orgs', authenticate)
  app.patch('/org/refresh', refreshToken)

  // ** Authenticate **
  app.get('/me', { onRequest: [VerifyJwt] }, profile)
}
