const sequelize = require('./sequelize');

const Employee = require('../../model/sequelize/Employee');
const Service = require('../../model/sequelize/Service');
const Car = require('../../model/sequelize/Car');
const authUtil = require('../../util/authUtils');
const passHash = authUtil.hashPassword('12345');

module.exports = () => {
    Employee.hasMany(Service, {as: 'services', foreignKey: {name: 'emp_id', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Service.belongsTo(Employee, {as: 'employee', foreignKey: {name: 'emp_id', allowNull: false} } );
    Car.hasMany(Service, {as: 'services', foreignKey: {name: 'ser_id', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Service.belongsTo(Car, {as: 'cars', foreignKey: {name: 'ser_id', allowNull: false} });

    let allEmps, allCars;
    return sequelize
        .sync({force: true})
        .then( () => {
            return Employee.findAll();
        })
        .then(emps => {
            if( !emps || emps.length == 0 ) {
                return Employee.bulkCreate([
                    {firstName: 'Jan', lastName: 'Kowalski', telephone: '2345678', email: 'jan.kowalski@acme.com', password: passHash},
                    {firstName: 'Adam', lastName: 'Zieliński', telephone: '9876546', email: 'adam.zielinski@acme.com', password: passHash},
                    {firstName: 'Marian', lastName: 'Nowak', telephone: '123456', email: 'marian.nowak@acme.com', password: passHash},
                ])
                .then( () => {
                    return Employee.findAll();
                });
            } else {
                return emps;
            }
        })
        .then( emps => {
            allEmps = emps;
            return Service.findAll();
        })
        .then( cars => {
            if( !cars || cars.length == 0 ) {
                return Car.bulkCreate([
                    { mark: 'Toyota', model: 'Supra', rokProdukcji: '2009', numerNadwozia: '1234567890'},
                    { mark: 'BMW', model: 'M%', rokProdukcji: '2010', numerNadwozia: '0987654321'},
                    { mark: 'Mazda', model: 'Miata', rokProdukcji: '2004', numerNadwozia: '324165374'},
                    { mark: 'Fiat', model: 'Panda', rokProdukcji: '2012', numerNadwozia: '6785665865'},
                ])
                .then( () => {
                    return Employee.findAll();
                });
            } else {
                return cars;
            }
        })
        .then( cars => {
            allCars = cars;
            return Service.findAll();
        })
        .then( services => {
            if( !services || services.length == 0 ) {
                return Service.bulkCreate([
                    {emp_id: allEmps[1]._id, car_id: allCars[0]._id, usluga: 'Naprawa', koszt: 4000, dateFrom: '2001-02-01', dateTo: '2009-02-01'},
                    {emp_id: allEmps[0]._id, car_id: allCars[0]._id, usluga: 'Wymiana oleju', koszt: 5000, dateFrom: '2001-01-01', dateTo: '2009-01-01'},
                    {emp_id: allEmps[0]._id, car_id: allCars[1]._id, usluga: 'Wymiana klockow', koszt: 3000, dateFrom: '2009-01-02', dateTo: null},
                    {emp_id: allEmps[2]._id, car_id: allCars[2]._id, usluga: 'Wymiana oleju', koszt: 5000, dateFrom: '2001-01-01', dateTo: '2009-01-01'},
                    {emp_id: allEmps[1]._id, car_id: allCars[2]._id, usluga: 'Naprawa', koszt: 4000, dateFrom: '2001-02-01', dateTo: '2009-02-01'},
                    {emp_id: allEmps[0]._id, car_id: allCars[1]._id, usluga: 'Wymiana klockow', koszt: 3000, dateFrom: '2009-01-02', dateTo: null}
                ]);
            } else {
                return services;
            }
        });
};

