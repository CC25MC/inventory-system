const { Model, DataTypes } = require('sequelize');
const {sequelize} = require('../database/index');

const Product = require('./producto');

class Inventario extends Model {}
Inventario.init({
    stock:                  {type: DataTypes.NUMBER, allowNull: true},
    entradasStock:          {type: DataTypes.STRING, allowNull: true},
    entradasValor:          {type: DataTypes.STRING, allowNull: true},
    salidasStock:           {type: DataTypes.STRING, allowNull: true},
    entradasValor:          {type: DataTypes.STRING, allowNull: true},
    status:                 {type: DataTypes.BOOLEAN, allowNull: true},
}, {
    sequelize,
    modelName: "Inventario"
});

Inventario.belongsTo(Product);
Product.hasMany(Inventario);

module.exports = Inventario; 