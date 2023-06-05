const express = require("express") // inicio do express
const router = express.Router() // configuraçao da primeira 
const cors = require('cors') // trazer o pacote cors que permite consumir essa API no front-end
const conectaBancoDeDados = require ('./bancoDeDados')  // ligando ao arquivo bancoDeDados
conectaBancoDeDados () // chamando a função que conecta o banco de dados

const Mulher= require('./mulherModel')

const app = express() // iniciando o app  
app.use(express.json ())
app.use(cors())

const porta = 3333 // criaçao da porta


 //GET
 async function  mostraMulheres(request, response) {
    try {
        const mulheresVindasDoBancoDeDados  = await Mulherfind()
        
        response.json(mulheresVindasDoBancoDeDados)
    }catch(erro){
        console.log(erro)

    }
} 

 //POST
async function criaMulher (request, response) {
    const novaMulher = new Mulher({
   
        nome: request.body.nome,
        imagem: request.body.imagem,
        minibio: request.body.minibio,
        citacao: request.body.citacao
    })

    try {
        const mulherCriada = await novaMulher.save()
        response.status(201).json(mulherCriada)
    } catch (erro) {
        console.log (erro)
    }
}

//PATCH
async function corrigeMulher (request,response){
    try {
     const mulherEncontrada = await Mulher.findById(request.params.id)
     
    if (request.body.nome) {
        mulherEncontrada.nome = request.body.nome
       }
   
       if (request.body.imagem) {
        mulherEncontrada.imagem = request.body.imagem
       }
       
       if (request.body.minibio) {
        mulherEncontrada.minibio = request.body.minibio
       } 

       if(request.body.citacao){
        mulherEncontrada.citacao = request.body.citacao
       }

       const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save()
       response.json(mulherAtualizadaNoBancoDeDados) // envio da resposta

    }catch(erro) {
        console.log(erro)
    }
     
}

//DELETE
async function deletaMulher(request,response){
    try{
        await Mulher.findByIdAndDelete(request.params.id)
        response.json({mensagem: 'Mulher deletada com sucesso!'})
    } catch(erro) {
       console.log(erro)
    }
}

app.use(router.get('/mulheres',mostraMulheres)) // configuraçao rota GET /mulheres
app.use(router.post ('/mulheres', criaMulher)) // configuracao de rota POS /mulheres
app.use(router.patch('/mulheres/:id', corrigeMulher)) // configuraçao rota PATCH /mulheres
app.use(router.delete('/mulheres/:id', deletaMulher)) // configuracao da rota DELETE /mulheres

//PORTA
function mostraPorta() {
    console.log("Servidor criado e rodando na porta", porta)
}

app.listen(porta, mostraPorta) // servidor ouvindo a porta  