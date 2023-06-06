import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists'
import { MakeRegisterOrgUseCase } from '@/use-cases/factories/make-register-org-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    title: z.string(),
    description: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    addresses: z
      .object({
        city: z.string(),
        phone: z.string(),
        street: z.string(),
      })
      .optional(),
  })

  const { title, email, password, description, addresses } =
    registerBodySchema.parse(request.body)

  try {
    const registerUseCase = MakeRegisterOrgUseCase()

    await registerUseCase.execute({
      title,
      email,
      password,
      description,
      addresses,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
    return err
  }

  return reply.status(201).send()
}
