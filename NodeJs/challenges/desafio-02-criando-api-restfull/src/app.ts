import fastify from 'fastify'
import cookie from '@fastify/cookie'
import { refeicoesRoutes } from './routes/refeicoes'
import { usersRoutes } from './routes/users'

export const app = fastify()

app.register(cookie)

app.register(refeicoesRoutes, {
  prefix: 'meals',
})

app.register(usersRoutes, {
  prefix: 'users',
})
