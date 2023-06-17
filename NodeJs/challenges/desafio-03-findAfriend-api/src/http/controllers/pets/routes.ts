import { FastifyInstance } from 'fastify'
import { register } from './register'
import { petProfile } from './pet-profile'
import { VerifyJwt } from '@/http/middlewares/verify-jwt'
import { searchByCity } from './search-by-city'
import { fetchByFilter } from './fetch-by-filter'
import { VerifyUserRole } from '@/http/middlewares/verify-user-role'

export async function petRoutes(app: FastifyInstance) {
  app.addHook('onRequest', VerifyJwt)

  app.post('/org/pets', { onRequest: [VerifyUserRole('ADMIN')] }, register)
  app.get('/pets/:petId', petProfile)
  app.get('/pets/city', searchByCity)
  app.get('/pets', fetchByFilter)
}
