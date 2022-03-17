const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '/inventorysystemdata/data/database.sqlite',
    //logging: false
  });

const dbinit = async () =>{
   try {
    await sequelize.authenticate();
    console.log('conectado a la DB');
    await sequelize.sync({force:false});
    console.log('database online')
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } 
  }



  module.exports = {sequelize,dbinit}