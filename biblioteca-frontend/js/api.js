const API = "http://localhost:3000";


async function requisicao(url, metodo="GET", dados=null){


const opcoes={

method:metodo,

headers:{
"Content-Type":"application/json"
}

}


if(dados){

opcoes.body=JSON.stringify(dados)

}



const resposta =
await fetch(API+url,opcoes)



return await resposta.json();



}