exports.showServiceList = (req, res, next) => {
    res.render('pages/service/list', {navLocation: 'emp'});
}

exports.showAddServiceForm = (req, res, next) => {
    let allEmps, allSer;
    EmployeeRepository.getEmployees()
        .then(emps => {
            allEmps = emps;
            return ServiceRepository.getServices();
        })
        .then(services => {
            allSer = services;
            res.render('pages/service/form', {
                employment: {},
                formMode: 'createNew',
                allEmps: allEmps,
                allDepts: allDepts,
                pageTitle: 'Nowe zatrudnienia',
                btnLabel: 'Dodaj zatrudnienie',
                formAction: '/service/add',
                navLocation: 'service'
            });
        });
}


exports.showServiceDetails = (req, res, next) => {
    res.render('pages/service/details', {});
}