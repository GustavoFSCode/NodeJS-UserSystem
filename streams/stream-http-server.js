import http from 'node:http'
import { Transform } from 'node:stream'

class InverseNumberStream extends Transform {
    _transform(chunk, enconding, callback){
        const transformed = Number(chunk.toString()) * -1
        console.log(transformed)
        callback(null, Buffer.from(String(transformed)))
    }
}

/*
req = ReadableStream
res = WriteableStream
*/

const server = http.createServer(async(req, res) => {
    //So devolver o valor após consumir todos os chunks
    const buffers = []

    for await (const chunk of req){
        buffers.push(chunk)
    }

    /* Arquivos JSON não podem ser consumidor parcialmentes, pois apenas uma parte dele não serve
    ex: {"name": "Gustavo", "email": "dynamic.player10@gmail.com", "ida} */

    const fullStreamContent = Buffer.concat(buffers).toString()

    console.log(fullStreamContent)

    return res.end(fullStreamContent)


    /*
    return req
    .pipe(new InverseNumberStream())
    .pipe(res)
    */
})

server.listen(3334)