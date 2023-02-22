import { Database } from "./database.js"
import { randomUUID } from 'node:crypto'
import { buildRoutePath } from "./utils/build-route-path.js"

const database = new Database() 

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath( '/users'),
    handler: (request, response) => {
      const { search } = request.query
      
      const users = database.select('users', search ? {
        nome: search,
        email: search,
      }: null)
      return response.end(JSON.stringify(users))
    }
  },
  {
    method: 'POST',
    path: buildRoutePath( '/users'),
    handler: (request, response) => {
      const { nome, email} = request.body

    const user = ({
      id: randomUUID(),
      nome: nome,
      email: email,
    })

    database.insert('users', user)
  
    return response.end()
}
  },
  {
    method: 'PUT',
    path: buildRoutePath('/users/:id'),
    handler: (request, response) => {
      const { id } = request.params
      const { nome, email } = request.body

      database.update('users', id, {
        nome, 
        email
      })

      return response.writeHead(204).end()
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/users/:id'),
    handler: (request, response) => {
      const { id }= request.params

      database.delete('users', id)

      return response.writeHead(204).end()
    }
  }
]