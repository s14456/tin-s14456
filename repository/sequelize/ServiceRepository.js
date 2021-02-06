const Sequelize = require('sequelize');

const Employee = require("../../model/sequelize/Employee");
const Service = require("../../model/sequelize/Service");
const Car = require("../../model/sequelize/Cars");

exports.getServices = () => {
    return Service.findAll({include: [
        {
            model: Employee,
            as: 'employee'
        },
        {
            model: Car,
            as: 'car'
        }]
    });
};


exports.getServiceId = (employmentId) => {
    return Service.findByPk(employmentId, {include: [
            {
                model: Employee,
                as: 'employee'
            },
            {
                model: Car,
                as: 'car'
            }]
    });
};

exports.createService = (data) => {
    console.log(JSON.stringify(data));

    return Service.create({
        emp_id: data.emp_id,
        dept_id: data.car_id,
        usluga: data.usluga,
        koszt: data.koszt,
        dateFrom: data.dateFrom,
        dateTo: data.dateTo
    });
};

exports.updateService = (serviceId, data) => {
    return Service.update(data, {where: {_id: serviceId }});
}

exports.deleteService = (serviceId) => {
    return Service.destroy({
        where: { _id: serviceId }
    });
}

exports.deleteManyServices = (servicesIds) => {
    return Service.find({ _id: { [Sequelize.Op.in]: servicesIds }})
}

