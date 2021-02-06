const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Car = sequelize.define('Car', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    mark: {
        type: Sequelize.STRING,
        allowNull: false
    },
    model: {
        type: Sequelize.STRING,
        allowNull: false
    },
    rokProdukcji: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    numerNadwozia: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = Car;
