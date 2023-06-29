import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials'
import { MakeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string(),
    password: z.string(),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateUseCase = MakeAuthenticateUseCase()

    const { userAuth } = await authenticateUseCase.execute({ email, password })

    const token = await reply.jwtSign(
      {
        role: userAuth.role,
      },
      {
        sign: {
          sub: userAuth.id,
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      {
        role: userAuth.role,
      },
      {
        sign: {
          sub: userAuth.id,
          expiresIn: '7d',
        },
      },
    )

    return reply
      .status(200)
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .send({ token })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
