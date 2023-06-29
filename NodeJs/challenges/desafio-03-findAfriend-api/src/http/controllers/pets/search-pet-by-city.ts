import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found'
import { MakeSearchByCity } from '@/use-cases/factories/make-search-by-city'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function searchPetByCity(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const searchByCityQuerySchema = z.object({
    city: z.string(),
  })

  const { city } = searchByCityQuerySchema.parse(request.query)

  try {
    const searchByCityUseCase = MakeSearchByCity()

    const { pets } = await searchByCityUseCase.execute({ city })

    return reply.status(200).send({ pets })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }
  }
}
