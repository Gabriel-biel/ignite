import { FastifyInstance } from 'fastify'
import { register } from './register'
import { profile } from './profile'
import { authenticate } from './authenticate'
import { VerifyJwt } from '@/http/middleware/verify-jwt'
import { deleteUser } from './delete-user'
import { verifyRole } from '@/http/middleware/verify-role'
import { refreshToken } from './refresh-token'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions/user', authenticate)

  app.patch('/user/refresh', refreshToken)

  // Authenicated
  app.get('/user/me', { onRequest: [VerifyJwt] }, profile)
  app.delete(
    '/user/delete/:userId',
    { onRequest: [VerifyJwt, verifyRole('Admin')] },
    deleteUser,
  )
}
