import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { VerifyJwt } from '@/http/middlewares/verify-jwt'

export async function orgRoutes(app: FastifyInstance) {
  app.post('/orgs', register)
  app.post('/sessions/orgs', authenticate)

  // ** Authenticate **
  app.get('/me', { onRequest: [VerifyJwt] }, profile)
}
