const Employee = require("../../model/sequelize/Employee");
const Service = require("../../model/sequelize/Service");
const Car = require("../../model/sequelize/Car");

exports.getEmployees = () => {
    return Employee.findAll();
};

exports.getEmployeeById = (empId) => {
    return Employee.findByPk(empId,
        {
            include: [{
                model: Service,
                as: 'services',
                include: [{
                    model: Car,
                    as: 'car'
                }]
            }]
        });
};

exports.createEmployee = (newEmpData) => {
    const vRes = empSchema.validate(newEmpData, { abortEarly: false} );
    if(error) {
        return Promise.reject(error);
    }
    return checkEmailUnique(newEmpData.email)
        .then(emailErr => {
            if(emailErr) {
                return Promise.reject(emailErr);
            } else {
                const firstName = newEmpData.firstName;
                const lastName = newEmpData.lastName;
                const telephone = newEmpData.telephone;
                const email = newEmpData.email;
                const sql = 'INSERT into Employee (firstName, lastName, email) VALUES (?, ?, ?)'
                return db.promise().execute(sql, [firstName, lastName, telephone, email]);
            }
        })
        .catch(err => {
            return Promise.reject(err);
        });
};



exports.updateEmployee = (empId, empData) => {
    const firstName = empData.firstName;
    const lastName = empData.lastName;
    const telephone = empData.telephone;
    const email = empData.email;
    return Employee.update(empData, {where: {_id: empId }});
};

exports.deleteEmployee = (empId) => {
    return Employee.destroy({
        where: { _id: empId }
    });

}; 

exports.findByEmail = (email) => {
    return Employee.findOne({
        where: {email: email}
    });
}


checkEmailUnique = (email, empId) => {
    let sql, promise;
    if(empId) {
        sql = `SELECT COUNT(1) as c FROM Employee where _id != ? and email = ?`;
        promise = db.promise().query(sql, [empId, email]);
    } else {
        sql = `SELECT COUNT(1) as c FROM Employee where email = ?`;
        promise = db.promise().query(sql, [email]);
    }
    return promise.then( (results, fields) => {
        const count = results[0][0].c;
        let err = {};
        if(count > 0) {
            err = {
                details: [{
                    path: ['email'],
                    message: 'Podany adres email jest już używany'
                }]
            };
        }
        return err;
    });
}