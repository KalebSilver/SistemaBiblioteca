
async function cadastrarUsuario(){


let usuario = {


nome:
nome.value,


telefone:
telefone.value,


email:
email.value


};



let resposta = await requisicao(

"/usuarios",

"POST",

usuario

);



alert(
resposta.mensagem ||
"Usuário cadastrado"
);



listarUsuarios();


}





async function listarUsuarios(){


let resposta =
await requisicao("/usuarios");



let tabela =
document.getElementById(
"listaUsuarios"
);



tabela.innerHTML="";



resposta.dados.forEach(usuario=>{


tabela.innerHTML += `


<tr>


<td>${usuario.nome}</td>


<td>${usuario.telefone}</td>


<td>${usuario.email}</td>



<td>


<button onclick="editarUsuario(${usuario.id})">

Editar

</button>


<button onclick="deletarUsuario(${usuario.id})">

Excluir

</button>


</td>


</tr>



`;



});



}






async function deletarUsuario(id){


if(!confirm("Excluir usuário?"))

return;



await requisicao(

`/usuarios/${id}`,

"DELETE"

);



listarUsuarios();


}







async function editarUsuario(id){


let nome =
prompt("Novo nome:");



let telefone =
prompt("Novo telefone:");



let email =
prompt("Novo email:");



await requisicao(

`/usuarios/${id}`,

"PUT",

{

nome,

telefone,

email

}


);



listarUsuarios();


}




listarUsuarios();