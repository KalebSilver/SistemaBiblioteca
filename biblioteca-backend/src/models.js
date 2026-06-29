const db = require("./database");


// ==========================
// LIVROS
// ==========================


exports.criarLivro = async (livro)=>{

const resultado = await db.query(

`
INSERT INTO livros
(codigo,titulo,autor,categoria,quantidade)

VALUES($1,$2,$3,$4,$5)

RETURNING *
`,

[
livro.codigo,
livro.titulo,
livro.autor,
livro.categoria,
livro.quantidade
]

);


return resultado.rows[0];

};



exports.listarLivros = async()=>{

const resultado = await db.query(
"SELECT * FROM livros"
);

return resultado.rows;

};



exports.buscarLivro = async(id)=>{

const resultado = await db.query(

"SELECT * FROM livros WHERE id=$1",

[id]

);

return resultado.rows[0];

};



exports.atualizarLivro = async(id,livro)=>{


const resultado = await db.query(

`
UPDATE livros SET

titulo=$1,
autor=$2,
categoria=$3,
quantidade=$4

WHERE id=$5

RETURNING *

`,

[
livro.titulo,
livro.autor,
livro.categoria,
livro.quantidade,
id
]


);


return resultado.rows[0];

};



exports.removerLivro = async(id)=>{


await db.query(

"DELETE FROM livros WHERE id=$1",

[id]

);

};





// ==========================
// USUÁRIOS
// ==========================



exports.criarUsuario = async(usuario)=>{


const resultado = await db.query(

`
INSERT INTO usuarios

(nome,telefone,email)

VALUES($1,$2,$3)

RETURNING *

`,

[
usuario.nome,
usuario.telefone,
usuario.email
]


);


return resultado.rows[0];

};



exports.listarUsuarios = async()=>{


const resultado = await db.query(

"SELECT * FROM usuarios"

);


return resultado.rows;


};



exports.buscarUsuario = async(id)=>{


const resultado = await db.query(

"SELECT * FROM usuarios WHERE id=$1",

[id]

);


return resultado.rows[0];


};



exports.atualizarUsuario = async(id,usuario)=>{


const resultado = await db.query(

`

UPDATE usuarios SET

nome=$1,

telefone=$2,

email=$3


WHERE id=$4

RETURNING *

`,

[
usuario.nome,
usuario.telefone,
usuario.email,
id
]


);


return resultado.rows[0];


};



exports.removerUsuario = async(id)=>{


await db.query(

"DELETE FROM usuarios WHERE id=$1",

[id]

);


};

// ==========================
// EMPRÉSTIMOS
// ==========================



exports.buscarQuantidadeLivro = async(id)=>{


const resultado = await db.query(

"SELECT quantidade FROM livros WHERE id=$1",

[id]

);


return resultado.rows[0];

};





exports.diminuirLivro = async(id)=>{


await db.query(

`
UPDATE livros

SET quantidade = quantidade - 1

WHERE id=$1

`,

[id]

);


};





exports.criarEmprestimo = async(dados)=>{


const resultado = await db.query(

`

INSERT INTO emprestimos

(usuario_id,livro_id,data_prevista_devolucao)

VALUES($1,$2,$3)

RETURNING *

`,

[

dados.usuario_id,

dados.livro_id,

dados.data_prevista_devolucao

]


);



return resultado.rows[0];


};





exports.listarEmprestimos = async()=>{


const resultado = await db.query(

`

SELECT 

emprestimos.*,

usuarios.nome AS usuario,

livros.titulo AS livro


FROM emprestimos


JOIN usuarios

ON usuarios.id = emprestimos.usuario_id


JOIN livros

ON livros.id = emprestimos.livro_id

`

);



return resultado.rows;


};





exports.buscarEmprestimo = async(id)=>{


const resultado = await db.query(

"SELECT * FROM emprestimos WHERE id=$1",

[id]

);


return resultado.rows[0];


};





exports.buscarEmprestimosUsuario = async(id)=>{


const resultado = await db.query(

`

SELECT *

FROM emprestimos

WHERE usuario_id=$1

`,

[id]

);



return resultado.rows;


};
// ==========================
// DEVOLUÇÃO
// ==========================


exports.devolverLivro = async(id)=>{


const resultado = await db.query(

`

SELECT *

FROM emprestimos

WHERE id=$1

`,

[id]

);


return resultado.rows[0];


};





exports.aumentarLivro = async(id)=>{


await db.query(

`

UPDATE livros

SET quantidade = quantidade + 1

WHERE id=$1

`,

[id]

);


};





exports.finalizarEmprestimo = async(id,data)=>{


const resultado = await db.query(

`

UPDATE emprestimos

SET

status='devolvido',

data_devolucao=$1


WHERE id=$2


RETURNING *

`,

[

data,

id

]

);



return resultado.rows[0];


};