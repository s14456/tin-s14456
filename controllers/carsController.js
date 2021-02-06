exports.showCarList = (req, res, next) => {
    res.render('pages/cars/list', {navLocation: 'emp'});
}

exports.showAddCarForm = (req, res, next) => {
    res.render('pages/cars/form', {});
}

exports.showCarDetails = (req, res, next) => {
    res.render('pages/cars/details', {});
}