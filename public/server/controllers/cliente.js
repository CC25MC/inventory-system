const Clientes = require('../models/cliente');

const test = async (req,res) => {

    const response = { success: true, data: "clientes" }

  res.json(response);
};

const list = async (req, res) => {

  const response = await Clientes.findAll()
  .then(function(data){
    const res = { success: true, data: data }
    return res;
  })
  .catch(error =>{
    const res = { success: false, error: error }
    return res;
  })
  res.json(response);

}

const create = async ( req, res) =>{

  try {

    const response = await Clientes.create({
        nombre      : req.body.nombre,
        direccion   : req.body.direccion,
        correo      : req.body.correo,
        telefono    : req.body.telefono,
        rut         : req.body.rut,
        notas       : req.body.notas
    })
    .then(function(data){
      const res = { success: true, data: data, message:"creado exitosamente" }
      return res;
    })
    .catch(error=>{
      const res = { success: false, error: error }
      return res;
    })
    res.json(response);

  } catch (e) {
    console.log(e);
  }
}

const update = async ( req, res) =>{

  try {

    const { id } = req.params;

    const response = await Clientes.update({
        nombre      : req.body.nombre,
        direccion   : req.body.direccion,
        correo      : req.body.correo,
        telefono    : req.body.telefono,
        rut         : req.body.rut,
        notas       : req.body.notas
    },{
      where: { id: id}
    })
    .then(function(data){
      const res = { success: true, data: data, message:"actualizado exitosamente" }
      return res;
    })
    .catch(error=>{
      const res = { success: false, error: error }
      return res;
    })
    res.json(response);

  } catch (e) {
    console.log(e);
  }
}

const getOne = async ( req, res) =>{

  try {

    const { id } = req.params;

    const response = await Clientes.findAll({
      where: { id: id}
    })
    .then( function(data){
      const res = { success: true, data: data }
      return res;
    })
    .catch(error => {
      const res = { success: false, error: error }
      return res;
    })
    res.json(response);

  } catch (e) {
    console.log(e);
  }
}


const deleteOne = async ( req, res) =>{

  try {

    const { id } = req.params;

    const response = await Clientes.destroy({
      where: { id: id }
    })
    .then( function(data){
      const res = { success: true, data: data, message:"borrado exitosamente" }
      return res;
    })
    .catch(error => {
      const res = { success: false, error: error }
      return res;
    })
    res.json(response);

  } catch (e) {
    console.log(e);
  }
}

module.exports = {
    test,
    list,
    create,
    update,
    getOne,
    deleteOne
};