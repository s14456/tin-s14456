const EmployeeRepository = require('../repository/sequelize/EmployeeRepository');



exports.showEmployeeList = (req, res, next) => {
    EmployeeRepository.getEmployees()
        .then(emps => {
            res.render('pages/employee/list', {
                emps: emps,
                navLocation: 'emp'
            });
        });
}

exports.showAddEmployeeForm = (req, res, next) => {
    res.render('employee/form', {
        emp: {},
        pageTitle: 'Nowy pracownik',
        formMode: 'createNew',
        btnLabel: 'Dodaj pracownika',
        formAction: '/employee/add',
        navLocation: 'emp'
    });
}

exports.showEditEmployeeForm = (req, res, next) => {
    const empId = req.params.empId;
    EmployeeRepository.getEmployeeById(empId)
        .then(emp => {
            res.render('pages/employee/form', {
                emp: emp,
                formMode: 'edit',
                pageTitle: 'Edycja pracownika',
                btnLabel: 'Edytuj pracownika',
                formAction: '/employee/edit',
                navLocation: 'emp'
            });
        });
};

exports.showEmployeeDetails = (req, res, next) => {
    const empId = req.params.empId;
    EmployeeRepository.getEmployeeById(empId)
        .then(emp => {
            res.render('pages/employee/form', {
                emp: emp,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły pracownika',
                formAction: '',
                navLocation: 'emp'
            });
        });
}

exports.addEmployee = (req, res, next) => {
    const empData = { ...req.body };
    EmployeeRepository.createEmployee(empData)
        .then( result => {
            res.redirect('/employee');
        })
        .catch(err => {
            res.render('pages/employee/form', {
                emp: empData,
                pageTitle: 'Dodawanie pracownika',
                formMode: 'createNew',
                btnLabel: 'Dodaj pracownika',
                formAction: '/employee/add',
                navLocation: 'emp',
                validationErrors: []
            });
        });
};

exports.updateEmployee = (req, res, next) => {
    const empData = { ...req.body };
    EmployeeRepository.createEmployee(empData)
        .then( result => {
            res.redirect('/employee');
        })
        .catch(err => {
            res.render('pages/employee/form', {
                emp: emp,
                formMode: 'edit',
                pageTitle: 'Edycja pracownika',
                btnLabel: 'Edytuj pracownika',
                formAction: '/employee/edit',
                navLocation: 'emp',
                validationErrors: []
            });
        });
};

exports.deleteEmployee = (req, res, next) => {
const empId = req.params.empId;
EmployeeRepository.deleteEmployee(empId)
    .then( () => {
        res.redirect('/employee');
    });
};

err.errors.forEach(e => {
    if(e.path.includes('email') && e.type == 'unique violation') {
        e.message = "Podany adres email jest już używany";
    }
 });
 
 


