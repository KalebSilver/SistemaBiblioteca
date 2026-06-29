async function cadastrarLivro(){


let livro={


codigo:
codigo.value,


titulo:
titulo.value,


autor:
autor.value,


categoria:
categoria.value,


quantidade:
Number(quantidade.value)


}



let resposta =
await requisicao(
"/livros",
"POST",
livro
)



alert(resposta.mensagem || "Salvo")


listarLivros();


}





async function listarLivros(){


    const resposta = await requisicao("/livros");


    const tabela = document.getElementById(
        "lista"
    );


    tabela.innerHTML = "";


    resposta.dados.forEach(livro => {


        tabela.innerHTML += `


        <tr>


        <td>${livro.codigo}</td>


        <td>${livro.titulo}</td>


        <td>${livro.autor}</td>


        <td>${livro.quantidade}</td>


        <td>


        <button onclick="editarLivro(${livro.id})">

        Editar

        </button>


        <button onclick="deletarLivro(${livro.id})">

        Excluir

        </button>


        </td>


        </tr>


        `;



    });


}





async function deletarLivro(id){


    const confirmar =
    confirm("Deseja excluir esse livro?");


    if(!confirmar)
    return;



    const resposta =
    await requisicao(
        `/livros/${id}`,
        "DELETE"
    );


    alert(
        resposta.mensagem ||
        "Livro removido"
    );


    listarLivros();


}





async function editarLivro(id){


    const titulo =
    prompt("Novo título:");


    const autor =
    prompt("Novo autor:");
    



    const dados = {

        titulo,

        autor,




    };



    const resposta =
    await requisicao(

        `/livros/${id}`,

        "PUT",

        dados

    );



    alert(
        resposta.mensagem ||
        "Atualizado"
    );


    listarLivros();


}




listarLivros();