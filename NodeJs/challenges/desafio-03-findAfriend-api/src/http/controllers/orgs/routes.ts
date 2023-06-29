import { FastifyInstance } from 'fastify'
import { register } from './register'
import { profile } from './profile'
import { authenticate } from './authenticate'
import { VerifyJwt } from '@/http/middleware/verify-jwt'
import { deleteOrg } from './delete-org'
import { verifyRole } from '@/http/middleware/verify-role'
import { refreshToken } from './refresh-token'

export async function orgRoutes(app: FastifyInstance) {
  app.post('/orgs', register)
  app.post('/sessions/org', authenticate)

  app.patch('/org/refresh', refreshToken)

  // Authenticate
  // app.addHook('onRequest', VerifyJwt) // caso ouver mais rotas que precisam verificar o token, essa estrategia se encaixa melhor
  app.get('/org/me', { onRequest: [VerifyJwt] }, profile)
  app.delete(
    '/org/delete/:orgId',
    { onRequest: [VerifyJwt, verifyRole('Admin')] },
    deleteOrg,
  )
}
