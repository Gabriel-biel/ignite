import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found'
import { MakeRegisterPetUseCase } from '@/use-cases/factories/make-register-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerPetBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    age: z.enum(['FILHOTE', 'ADOLESCENTE', 'ADULTO']),
    porte: z.enum(['PEQUENINO', 'MEDIO', 'GRANDE']),
    energy_level: z.enum(['BAIXA', 'MEDIA', 'ALTO']),
    independence_level: z.enum(['BAIXA', 'MEDIA', 'ALTA']),
    environment: z.enum(['PEQUENO', 'GRANDE', 'AMPLO']),
    requirements: z.object({
      description: z.string(),
    }),
    available: z.coerce.date().default(new Date()),
  })

  const {
    name,
    age,
    description,
    energy_level,
    porte,
    environment,
    requirements,
    independence_level,
    available,
  } = registerPetBodySchema.parse(request.body)

  try {
    const registerPetUseCase = MakeRegisterPetUseCase()

    const { pet } = await registerPetUseCase.execute({
      name,
      age,
      description,
      energy_level,
      porte,
      environment,
      requirements,
      independence_level,
      available,
      org_id: request.user.sub,
    })
    return reply.status(201).send({ pet })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    return err
  }
}
