import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function refreshToken(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    await request.jwtVerify({ onlyCookie: true })
    const role = request.user.role

    const token = await reply.jwtSign(
      {
        role,
      },
      {
        sign: { sub: request.user.sub },
      },
    )
    const refreshToken = await reply.jwtSign(
      {
        role,
      },
      {
        sign: { sub: request.user.sub, expiresIn: '7d' },
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
