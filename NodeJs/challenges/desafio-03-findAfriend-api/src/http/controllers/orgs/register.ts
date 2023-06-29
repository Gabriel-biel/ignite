import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists'
import { MakeRegisterOrgUseCase } from '@/use-cases/factories/make-register-org-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    id: z.string().optional(),
    name: z.string(),
    email: z.string(),
    password: z.string(),
    role: z.enum(['Admin', 'Member']).optional(),
    addresses: z.object({
      city: z.string(),
      street: z.string(),
      phone: z.string(),
    }),
  })

  const { id, name, email, password, role, addresses } =
    registerBodySchema.parse(request.body)

  try {
    const registerOrgUseCase = MakeRegisterOrgUseCase()

    await registerOrgUseCase.execute({
      id,
      name,
      email,
      password,
      role,
      addresses,
    })
    return reply.status(201).send()
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
