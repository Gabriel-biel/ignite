import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found'
import { MakeRegisterPetUseCase } from '@/use-cases/factories/make-register-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    id: z.string().optional(),
    name: z.string(),
    description: z.string(),
    age: z.enum(['Filhote', 'Adolescente', 'Adulto']),
    size: z.enum(['Pequenino', 'Medio', 'Grande']),
    energy_level: z.enum(['Baixa', 'Medio', 'Alto']),
    independence_level: z.enum(['Baixo', 'Medio', 'Alto']),
    ambience: z.enum(['Pequeno', 'Amplo', 'Grande']),
    available: z.coerce.date().default(new Date()),
    requirements: z.object({
      description: z.string(),
    }),
  })

  const {
    id,
    name,
    age,
    size,
    description,
    ambience,
    energy_level,
    independence_level,
    available,
    requirements,
  } = registerBodySchema.parse(request.body)

  try {
    const registerPetUseCase = MakeRegisterPetUseCase()

    const { pet } = await registerPetUseCase.execute({
      id,
      name,
      age,
      size,
      description,
      ambience,
      energy_level,
      independence_level,
      available,
      requirements,
      org_id: request.user.sub,
    })

    return reply.status(200).send({ pet })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
