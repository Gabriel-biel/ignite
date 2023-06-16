import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found'
import { MakeFetchPetsFiltered } from '@/use-cases/factories/make-fetch-pets-filtered-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetchByFilter(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchPetsByFilterBodySchema = z.object({
    city: z.string(),
    age: z.enum(['FILHOTE', 'ADOLESCENTE', 'ADULTO']).optional(),
    porte: z.enum(['PEQUENINO', 'MEDIO', 'GRANDE']).optional(),
    energy_level: z.enum(['BAIXA', 'MEDIA', 'ALTO']).optional(),
    independence_level: z.enum(['BAIXA', 'MEDIA', 'ALTA']).optional(),
    environment: z.enum(['PEQUENO', 'GRANDE', 'AMPLO']).optional(),
  })

  const fetchPetsByFilterQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const query = fetchPetsByFilterBodySchema.parse(request.query)
  const { page } = fetchPetsByFilterQuerySchema.parse(request.query)

  try {
    const fetchByFilterUseCase = MakeFetchPetsFiltered()

    const { pets } = await fetchByFilterUseCase.execute({ query, page })

    return reply.status(200).send({ pets })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }
  }
}
