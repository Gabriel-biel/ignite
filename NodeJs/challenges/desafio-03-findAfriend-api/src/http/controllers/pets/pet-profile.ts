import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found'
import { MakeGetPetProfile } from '@/use-cases/factories/make-get-pet-profile'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function petProfile(request: FastifyRequest, reply: FastifyReply) {
  const getPetProfileParamsSchema = z.object({
    petId: z.string(),
  })

  const { petId } = getPetProfileParamsSchema.parse(request.params)
  try {
    const getPetProfile = MakeGetPetProfile()

    const { pet } = await getPetProfile.execute({ petId })

    return reply.status(200).send({ pet })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
  }
}
