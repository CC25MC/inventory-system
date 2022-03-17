const Combo = require('../models/combo');

const test = async (req,res) => {

    const response = { success: true, data: "combo" }

  res.json(response);
};

const list = async (req, res) => {

  const response = await Combo.findAll()
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

    const response = await Combo.create({
        nombre      : req.body.nombre,
        sku         : req.body.sku,
        codebar     : req.body.codebar,
        descripcion : req.body.descripcion,
        unidad      : req.body.unidad,
        precio      : req.body.precio,
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

    const response = await Combo.update({
      nombre      : req.body.nombre,
      sku         : req.body.sku,
      codebar     : req.body.codebar,
      descripcion : req.body.descripcion,
      unidad      : req.body.unidad,
      precio      : req.body.precio,
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

    const response = await Combo.findAll({
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

    const response = await Combo.destroy({
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