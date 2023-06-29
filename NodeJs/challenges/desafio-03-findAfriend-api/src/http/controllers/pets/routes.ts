import { FastifyInstance } from 'fastify'
import { register } from './register'
import { profile } from './profile'
import { verifyRole } from '@/http/middleware/verify-role'
import { VerifyJwt } from '@/http/middleware/verify-jwt'
import { deletePet } from './delete-pet'
import { searchPetByFilter } from './search-pet-by-filtering'
import { searchPetByCity } from './search-pet-by-city'

export async function petsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', VerifyJwt)
  app.post('/pets', { onRequest: verifyRole('Admin') }, register)
  app.get('/pet/profile/:petId', profile)
  app.get('/pets/filter', searchPetByFilter)
  app.get('/pets/city', searchPetByCity)
  app.delete(
    '/pet/delete/:petId',
    { onRequest: verifyRole('Admin') },
    deletePet,
  )
}
