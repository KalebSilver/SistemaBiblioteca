
async function realizarEmprestimo(){



let dados = {


usuario_id:

Number(
document.getElementById("usuario_id").value
),



livro_id:

Number(
document.getElementById("livro_id").value
),



data_prevista_devolucao:

document.getElementById(
"data_prevista_devolucao"
).value



};



let resposta = await requisicao(

"/emprestimos",

"POST",

dados

);



alert(

resposta.mensagem ||

"Empréstimo realizado"

);



listarEmprestimos();


}





async function listarEmprestimos(){


let resposta = await requisicao(

"/emprestimos"

);



let tabela = document.getElementById(

"listaEmprestimos"

);



tabela.innerHTML="";



resposta.dados.forEach(e => {



tabela.innerHTML += `


<tr>


<td>

${e.usuario_id}

</td>



<td>

${e.livro_id}

</td>



<td>

${e.status}

</td>



<td>

${e.data_emprestimo}

</td>



</tr>


`;



});


}



listarEmprestimos();

async function devolverLivro(){


let dados = {


data_devolucao:

document.getElementById(
"data_devolucao"
).value


};



let id =

document.getElementById(
"emprestimo_id"
).value;




let resposta = await requisicao(

`/emprestimos/${id}/devolver`,

"PUT",

dados

);




alert(

JSON.stringify(resposta)

);



listarEmprestimos();



}