const express = require("express")
const router = express.Router()
  
 const app = express()
 const porta = 3333

const mulheres = [
    {
        nome: 'Emily Cavalcanti',
        imagem:'https://github.com/emilycavalcanti.png',
        minibio: 'Desenvolvedora full stack'
    },
    {
        nome: 'Iana Chan',
        imagem: 'https://bit.ly/33CXBqP',
        minibio: 'Fundadora do PrograMaria'         
    },
    {
        nome: 'Simara Conceição',
        imagem: 'https://github.com/simaraconceicao.png',
        minibio: 'Desenvolvedora e Instrutora'
    },
    {
        nome: 'Nina da hora',
        imagem: 'https://bit.ly/3FKpFaz',
        minibio: 'Hacker antirracista'
    }
 ]

 function  mostraMulheres(resquest, response) {
    response.json(mulheres)
 }
 function mostraPorta() {
    console.log("Servidor criado e rodando na porta", porta)
 }

app.use(router.get('/mulheres',mostraMulheres))
app.listen(porta, mostraPorta)  