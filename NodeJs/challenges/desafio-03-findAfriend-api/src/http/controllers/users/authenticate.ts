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
        sign: { sub: userAuth.id },
      },
    )

    const refreshToken = await reply.jwtSign(
      {},
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
        path: '/', // quais rotas do backend vai ter acesso a esse cookie.
        secure: true, // Define que nosso cookie vai ser encriptado pelo https.
        sameSite: true, // Define que esse cookie só vai ser acessível dentro do mesmo dominío, dentro do mesmo site.
        httpOnly: true, // esse cookie só vai poder acessado pela requesição e responsta, somente pelo contexto da requesição
      })
      .send({ token })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
