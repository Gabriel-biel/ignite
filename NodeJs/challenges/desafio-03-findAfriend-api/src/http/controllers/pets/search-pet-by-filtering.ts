import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found'
import { MakeSearchPetsFiltered } from '@/use-cases/factories/make-search-pet-by-filering-use-case'

import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function searchPetByFilter(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchPetsByFilterBodySchema = z.object({
    city: z.string(),
    age: z.enum(['Filhote', 'Adolescente', 'Adulto']).optional(),
    porte: z.enum(['Pequenino', 'medio', 'Grande']).optional(),
    energy_level: z.enum(['Baixa', 'Medio', 'Alto']).optional(),
    independence_level: z.enum(['Baixo', 'Medio', 'Alto']).optional(),
    ambience: z.enum(['Pequeno', 'Amplo', 'Grande']).optional(),
  })

  const fetchPetsByFilterQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const query = fetchPetsByFilterBodySchema.parse(request.query)
  const { page } = fetchPetsByFilterQuerySchema.parse(request.query)

  try {
    const fetchByFilterUseCase = MakeSearchPetsFiltered()

    const { pets } = await fetchByFilterUseCase.execute({ query, page })

    return reply.status(200).send({ pets })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }
  }
}
