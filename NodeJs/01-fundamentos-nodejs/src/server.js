import http from 'node:http'

const users = []

const server = http.createServer((request, response) => {
  const {method, url} = request
  
  if (method === 'GET' && url === '/users') {
    return response
    .setHeader('content-type', 'Application/json')
    .end(JSON.stringify(users))
}

if (method === 'POST' && url === '/users') {
  users.push({
      id: 1,
    nome: 'Gabriel',
    email: 'gabriel@gabriel',
  })
  
  return response.end('Usuário criado')
}

})
server.listen(3333)