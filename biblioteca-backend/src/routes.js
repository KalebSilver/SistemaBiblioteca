const router=require("express").Router();


const controller=require("./controllers");



// LIVROS

router.post("/livros",controller.criarLivro);

router.get("/livros",controller.listarLivros);

router.get("/livros/:id",controller.buscarLivro);

router.put("/livros/:id",controller.atualizarLivro);

router.delete("/livros/:id",controller.removerLivro);



// USUARIOS

router.post(
"/usuarios",controller.criarUsuario);


router.get("/usuarios",controller.listarUsuarios);


router.get("/usuarios/:id",controller.buscarUsuario);


router.put("/usuarios/:id",controller.atualizarUsuario);


router.delete("/usuarios/:id",controller.removerUsuario);


// EMPRESTIMOS

router.post("/emprestimos",controller.criarEmprestimo);



module.exports=router;

// =====================
// EMPRÉSTIMOS
// =====================


router.post(

"/emprestimos",

controller.criarEmprestimo

);



router.get(

"/emprestimos",

controller.listarEmprestimos

);



router.get(

"/emprestimos/:id",

controller.buscarEmprestimo

);



router.get(

"/emprestimos/usuario/:usuario_id",

controller.emprestimosUsuario

);

// ==========================
// DEVOLUÇÕES
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

data_devolucao=$1,

status='devolvido'


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





exports.listarAtrasados = async()=>{


const resultado = await db.query(

`

SELECT


emprestimos.*,


usuarios.nome AS usuario,


usuarios.email,


livros.titulo AS livro



FROM emprestimos



JOIN usuarios

ON usuarios.id = emprestimos.usuario_id



JOIN livros

ON livros.id = emprestimos.livro_id



WHERE

status='ativo'


AND data_prevista_devolucao < CURRENT_DATE



`

);



return resultado.rows;


};
// =====================
// DEVOLUÇÃO
// =====================


router.put(

"/emprestimos/:id/devolver",

controller.devolverEmprestimo

);



router.get(

"/emprestimos/atrasados",

controller.atrasados

);

exports.listarAtrasados = async()=>{


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



WHERE 

emprestimos.status='ativo'


AND

emprestimos.data_prevista_devolucao < CURRENT_DATE


`

);



return resultado.rows;


};