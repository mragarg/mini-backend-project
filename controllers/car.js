const Car = require('../models/car');
const express = require('express');


async function showAllCars(req, res) {
    const carSales = await Car.getAll();
    res.render('car', {
        locals:
            {
                carVals: Car.displayCars(carSales)
            }
        });
    }
    
    function addCarPage(req, res) {
        res.render('car-add');
    }
    
    async function addCarDB(req, res) {
        await Car.addCar(req.body.carYear, req.body.carMake, req.body.carModel, req.body.carMileage, req.body.carPrice);
        showAllCars(req, res);
        // res.location('/car');
    }
    
    async function deleteCarPage(req, res) {
        const allCars = await Car.getAll();
    res.render('car-delete', {
        locals:
            {
                options: Car.displayID(allCars)
            }
    });
}

function deleteCarDB(req, res) {
    console.log(req.body.selectDelete);
    Car.deleteCar(req.body.selectDelete);
    console.log('Deleted');
    res.redirect('/car');
}

module.exports = {
    showAllCars,
    addCarPage,
    addCarDB,
    deleteCarPage,
    deleteCarDB
};