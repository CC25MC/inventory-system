const { Model, DataTypes } = require('sequelize');
const {sequelize} = require('../../database/index');

const Entrada = require('../entrada');
const Product = require('../producto');

class Entrada_Producto extends Model {}
Entrada_Producto.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    cantidad:           {type: DataTypes.NUMBER, allowNull: true},
    estatus:            {type: DataTypes.BOOLEAN, allowNull: true, defaultValue: true}
}, {
    sequelize,
    modelName: "Entrada_Producto"
});


Entrada.belongsToMany(Product, { through: 'Entrada_Producto' });
Product.belongsToMany(Entrada, { through: 'Entrada_Producto' });

module.exports = Entrada_Producto; 