import http from 'node:http'
import { Transform } from 'node:stream'

class InverseNumberString extends Transform {
  _transform(chunk, enconding, callback) {
    const transformed = Number(chunk.toString()) * -1

    console.log(transformed)

    callback(null, Buffer.from(String(transformed)))
  }
}

const server = http.createServer(async (request, response) => {
  const buffers = []

  for await (const chunk of request) {
    buffers.push(chunk)
  }

  const fullStringContent = Buffer.concat(buffers).toString()

  console.log(fullStringContent)

  return response.end(fullStringContent)

  // return request
  //   .pipe(new InverseNumberString())
  //   .pipe(response)
})



server.listen(3334)