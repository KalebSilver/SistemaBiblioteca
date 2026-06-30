async function carregarGraficos(){



const livros =
await requisicao("/livros");



const emprestimos =
await requisicao("/emprestimos");




// LIVROS POR CATEGORIA


let categorias = {};



livros.dados.forEach(livro=>{


categorias[livro.categoria] =

(categorias[livro.categoria] || 0) + 1;



});



new Chart(

document.getElementById(
"livrosCategoria"
),

{

type:"bar",

data:{


labels:Object.keys(categorias),


datasets:[{


label:"Livros",

data:Object.values(categorias)


}]


}


}

);




// STATUS DOS EMPRÉSTIMOS


let status={};



emprestimos.dados.forEach(item=>{


status[item.status] =

(status[item.status] || 0)+1;


});



new Chart(

document.getElementById(
"statusEmprestimo"
),

{

type:"pie",

data:{


labels:Object.keys(status),


datasets:[{


label:"Empréstimos",

data:Object.values(status)


}]


}


}

);



}



carregarGraficos();