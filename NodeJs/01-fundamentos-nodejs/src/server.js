import http from 'node:http'
import { randomUUID } from 'node:crypto'
import { json } from './middlewares/json.js'
import { Database } from "./database.js"

const database = new Database() 

const server = http.createServer(async(request, response) => {
  const {method, url} = request

  await json(request, response)

  if (method === 'GET' && url === '/users') {
    const users = database.select('users')

    return response.end(JSON.stringify(users))
}

if (method === 'POST' && url === '/users') {
  const { nome, email} = request.body

  const user = ({
    id: randomUUID(),
    nome: nome,
    email: email,
  })

  database.insert('users', user)
  
  return response.end('Usuário-criado')
}

})
server.listen(3333)