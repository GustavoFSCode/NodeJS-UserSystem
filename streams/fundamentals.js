/* Streams
Netflix & Spotify
Readable Streams / Writeable Streams (Netflix & Spotify)

Streams = Conectar as streams

process.stdin
.pipe(process.stdout)

Duplex = É a junção de Readble e Writable

*/

import {Readable, Writable, Transform} from 'node:stream'

class OneToHundredStream extends Readable {
    index = 1
        _read(){
            const i = this.index++
            const space = i + " "
            setTimeout(() => {

                if (i > 100){
                    this.push(null)
                } else {
                    const buf = Buffer.from(String(space))
                    this.push(buf)
                }
            }, 1000)
            }
}

class InverseNumberStream extends Transform {
    _transform(chunk, enconding, callback){
        const transformed = Number(chunk.toString()) * -1
        
        callback(null, Buffer.from(String(transformed)))
    }
}

class MultiplyByTenStream extends Writable{
 _write(chunk, enconding, callback) {
    console.log(Number(chunk.toString()) * 10)
    callback()
    }
}


new OneToHundredStream()
    .pipe(new InverseNumberStream())
    .pipe(new MultiplyByTenStream())