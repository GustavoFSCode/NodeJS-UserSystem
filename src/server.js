import http  from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './middlewares/routes.js'
import { buildRoutePath } from './utils/build-route-path.js'
import { extractQueryParams } from './utils/extract-query-params.js'
//Antigo CommonJS => require
//Novo ESModules => import/export
//HTTP
// - Método HTTP
// - URL
// GET, POST, PUT, PATCH, DELETE
/* GET = Buscar um recurso do back-end
POST = Criar um recurso no back-end
PUT = Atualizar um recurso do back-end
PATCH = Atualizar uma informação especifica de um recurso no back-end
DELETE = quando eu quero deletar um recurso do back-end

GET /users = buscando um usuario do meu back-end
POST /users = criando um usuario no meu back-end

Stateful - Stateless
Stateful = Sempre tem algum tipo de informação guardada em memoria (Para que continue funcionando)
Stateless = Não salva nada na memoria (Normalmente grava as informações em um BD ou em algum arquivo)

Usar JSON - Javascript Object Notation

Cabeçalhos (Requisição/Resposta) = Metadados

HTTP Status Code

UUID => Unique Universal ID (Iunic Identifier)

Query Paramenters: URL Stateful => filtros, paginação, modificam a resposta, não obrigatorios,
informações não sensiveis
http://localhost:3333/users?userId=1&name=Peter
Route Paramenters: Identificação de recurso
ex: GET http://localhost:3333/users/1 (Buscando o User com ID = 1)
DELETE http://localhost:3333/users/1 (Deletar o user com ID = 1)
Request Body: Envio de informações de um formulario / dados sensiveis (HTTPs)
POST http://localhost:3333/users


Edição e Remoção de User


*/

//Criar um usuario (name, email, password)


const server = http.createServer(async(req, res) => {
    const { method, url } = req
    await json(req, res)

        const route = routes.find(route => {
            return route.method === method && route.path.test(url)
        })

       if (route){
        const routeParams = req.url.match(route.path)
        const { query, ...params } = routeParams.groups



        req.params = params
        req.query = query ? extractQueryParams(query) : {}

        return route.handler(req, res)
       }
    
       return res.writeHead(404).end() 
})


server.listen(3333)
//localhost da maquina