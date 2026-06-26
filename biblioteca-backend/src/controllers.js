const model=require("./models");



exports.criarLivro=async(req,res)=>{


try{


const livro=await model.criarLivro(req.body);


res.status(201).json({

sucesso:true,

dados:livro

});


}

catch(error){


res.status(500).json({

sucesso:false,

mensagem:error.message

});


}


};

exports.listarLivros = async(req,res)=>{


const livros = await model.listarLivros();


res.json({

sucesso:true,

dados:livros

});


};





exports.buscarLivro = async(req,res)=>{


const livro = await model.buscarLivro(req.params.id);



if(!livro){

return res.status(404).json({

sucesso:false,

mensagem:"Livro não encontrado"

});

}



res.json({

sucesso:true,

dados:livro

});


};





exports.atualizarLivro = async(req,res)=>{


const livro = await model.atualizarLivro(

req.params.id,

req.body

);



res.json({

sucesso:true,

dados:livro

});


};





exports.removerLivro = async(req,res)=>{


await model.removerLivro(

req.params.id

);



res.json({

sucesso:true,

dados:{}

});


};

// =======================
// USUÁRIOS
// =======================



exports.criarUsuario=async(req,res)=>{


try{


const usuario = await model.criarUsuario(req.body);



res.status(201).json({

sucesso:true,

dados:usuario

});


}

catch(error){


res.status(500).json({

sucesso:false,

mensagem:error.message

});


}


};





exports.listarUsuarios=async(req,res)=>{


const usuarios = await model.listarUsuarios();


res.json({

sucesso:true,

dados:usuarios

});


};





exports.buscarUsuario=async(req,res)=>{


const usuario =
await model.buscarUsuario(req.params.id);



if(!usuario)

return res.status(404).json({

sucesso:false,

mensagem:"Usuário não encontrado"

});



res.json({

sucesso:true,

dados:usuario

});


};





exports.atualizarUsuario=async(req,res)=>{


const usuario =
await model.atualizarUsuario(

req.params.id,

req.body

);



res.json({

sucesso:true,

dados:usuario

});


};





exports.removerUsuario=async(req,res)=>{


await model.removerUsuario(req.params.id);



res.json({

sucesso:true,

dados:{}

});


};

// =======================
// EMPRÉSTIMOS
// =======================



exports.criarEmprestimo = async(req,res)=>{


try{


const livro = await model.buscarQuantidadeLivro(

req.body.livro_id

);



// verifica estoque

if(!livro || livro.quantidade <=0){


return res.status(409).json({

sucesso:false,

mensagem:"Livro indisponível para empréstimo"

});


}




// diminui quantidade

await model.diminuirLivro(

req.body.livro_id

);




// cria empréstimo

const emprestimo =

await model.criarEmprestimo(req.body);





res.status(201).json({

sucesso:true,

dados:emprestimo

});



}

catch(error){


res.status(500).json({

sucesso:false,

mensagem:error.message

});


}



};






exports.listarEmprestimos = async(req,res)=>{


const dados =
await model.listarEmprestimos();



res.json({

sucesso:true,

dados

});


};






exports.buscarEmprestimo = async(req,res)=>{


const emprestimo =

await model.buscarEmprestimo(

req.params.id

);



if(!emprestimo)

return res.status(404).json({

sucesso:false,

mensagem:"Empréstimo não encontrado"

});



res.json({

sucesso:true,

dados:emprestimo

});


};







exports.emprestimosUsuario = async(req,res)=>{


const dados =

await model.buscarEmprestimosUsuario(

req.params.usuario_id

);



res.json({

sucesso:true,

dados

});


};

// =======================
// DEVOLUÇÃO
// =======================


exports.devolverEmprestimo = async(req,res)=>{


try{


const emprestimo =

await model.devolverLivro(

req.params.id

);



if(!emprestimo){


return res.status(404).json({

sucesso:false,

mensagem:"Empréstimo não encontrado"

});


}




// devolve livro ao estoque

await model.aumentarLivro(

emprestimo.livro_id

);





const atualizado =

await model.finalizarEmprestimo(

req.params.id,

req.body.data_devolucao

);





// cálculo de atraso


const prevista =

new Date(

emprestimo.data_prevista_devolucao

);



const devolucao =

new Date(

req.body.data_devolucao

);



let atrasado=false;

let dias_atraso=0;




if(devolucao > prevista){


atrasado=true;


const diferenca =

devolucao - prevista;



dias_atraso =

Math.ceil(

diferenca /

(1000*60*60*24)

);



}




res.json({

sucesso:true,


dados:{


emprestimo: atualizado,


atrasado,


dias_atraso



}


});




}

catch(error){


res.status(500).json({

sucesso:false,

mensagem:error.message

});


}



};







exports.atrasados = async(req,res)=>{


const dados =

await model.listarAtrasados();



res.json({

sucesso:true,

dados

});


};