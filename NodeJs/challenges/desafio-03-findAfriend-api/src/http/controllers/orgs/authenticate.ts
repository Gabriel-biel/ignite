import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()
    const { authUser } = await authenticateUseCase.execute({ email, password })

    const token = await reply.jwtSign(
      {
        role: authUser.role,
      },
      {
        sign: { sub: authUser.id },
      },
    )

    const refreshToken = await reply.jwtSign(
      {
        role: authUser.role,
      },
      {
        sign: {
          sub: authUser.id,
          expiresIn: '7d',
        },
      },
    )

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true, // protegido por https, frontend não lê o valor bruto, como string
        sameSite: true, // somente acessivel dentro do mesmo dominio
        httpOnly: true, // somente pode ser acessado pelo backend da aplicação, ou seja, somente pelo contexto da requesição.
      })
      .status(200)
      .send({ token })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
