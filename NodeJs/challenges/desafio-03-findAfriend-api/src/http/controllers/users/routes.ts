import { FastifyInstance } from 'fastify'
import { register } from './register'
import { profile } from './profile'
import { VerifyJwt } from '@/http/middlewares/verify-jwt'
import { authenticate } from './authenticate'
import { refreshToken } from './refresh-token'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions/users', authenticate)
  app.patch('/users/refresh', refreshToken)

  // ** Authenticated **
  app.get('/profile', { onRequest: [VerifyJwt] }, profile)
}
