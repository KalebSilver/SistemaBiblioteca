
async function emprestar(){


let dados={


usuario_id:
Number(usuario_id.value),


livro_id:
Number(livro_id.value),


data_prevista_devolucao:
data_prevista_devolucao.value


}



let resposta =
await requisicao(

"/emprestimos",

"POST",

dados

)



alert(
resposta.mensagem || 
"Empréstimo realizado"
)



}