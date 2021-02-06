const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Service = sequelize.define('Service', {
   _id: {
       type: Sequelize.INTEGER,
       autoIncrement: true,
       allowNull: false,
       primaryKey: true,
   },
   carID: {
       type: Sequelize.INTEGER,
       allowNull: false
   },
   usluga: {
       type: Sequelize.STRING,
       allowNull: false
   },
   koszt:{
       type: Sequelize.INTEGER,
        allowNull: false
   },
   dataPrzyjecia: {
       type: Sequelize.DATE,
       allowNull: false,
   },
   dataOdbioru: {
    type: Sequelize.DATE,
    allowNull: true
}});

module.exports = Service;