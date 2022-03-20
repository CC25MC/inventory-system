const Combo = require('../models/combo');
const Producto = require('../models/producto');
const Combo_Producto = require('../models/Relaciones/combo_productos')

const test = async (req,res) => {

    const response = { success: true, data: "combo" }

  res.json(response);
};

const list = async (req, res) => {

  const response = await Combo.findAll({
   include: {
    model: Producto,
  }
  })
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

    const {productos} = req.body;

    const response = await Combo.create({
      nombre      : req.body.nombre,
      sku         : req.body.sku,
      codebar     : req.body.codebar,
      descripcion : req.body.descripcion,
      unidad      : req.body.unidad,
      precio      : req.body.precio,
    })
    .then(async function(data){
      if(productos && productos.length > 0){ 
        let arrid=[];
        let arrcantidad=[];
        productos.forEach(producto => {
          arrid.push(producto.id)
          arrcantidad.push(producto.cantidad)
        });
        const relacion = await data.addProducto(arrid)
        for(let i=0; i < relacion.length; i++) {
          arrcantidad[i]
            const response = await Combo_Producto.update({
            cantidad      : arrcantidad[i],
            },{
              where: { id: relacion[i].id}
            })
        }

      }
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
    res.json(e)
  }
}

const update = async ( req, res) =>{

  try {

    const { id } = req.params;
    const {productos} = req.body; 

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
    .then(async function(data){
      //buscar modelo
      const comboarr = await Combo.findAll({
        where: { id: id}
      })
      const comboproductoarr = await Combo_Producto.findAll({
          where: { ComboId: comboarr[0].id}
      })
      for(let i=0;i<productos.length;i++){
        let encontrado = false;
        for(let j =0; j<comboproductoarr.length;j++){
          if(comboproductoarr[j].ProductoId==productos[i].id){
            await Combo_Producto.update({
              cantidad      : productos[i].cantidad,
            },{
              where: { id: comboproductoarr[j].id}
            })
            encontrado=true;
            break;
          }
        }
        if(!encontrado){
          const productexist = await Producto.findAll({
            where: { id: productos[i].id}
          })
          if(productexist.length>0){
            Combo_Producto.create({
              cantidad        : productos[i].cantidad,
              ComboId         : comboarr[0].id,
              ProductoId      : productos[i].id
            })
          }
        }

      }

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
      where: { id: id},
      include: {
        model: Producto,
      }
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