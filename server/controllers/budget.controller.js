const { request } = require('express');
const Budget = require('../models/budget.model.js');

// Retrieve and return all budgets from the database.
exports.findAll = (req, res) => {
    Budget.find()
    .then(budget => {
        res.send(budget);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving budgets."
        });
    });
};

// Update a budget identified by the id in the request
exports.update = (req, res) => {
    console.log(req.body);
    Budget.findByIdAndUpdate(req.params.id, {
        "grocery store": req.body.grocery,
        "fast food": req.body.fastfood,
        "bar": req.body.bar,
        "payment": req.body.rent,
        "renter's insurance": req.body.rentinsurance,
        "TV Subscriptions": req.body.tv,
        "Live Events": req.body.events,
        "Other": req.body.otherentertainment,
        "Gas": req.body.gasutils,
        "water": req.body.water,
        "Electricity": req.body.electricity,
        "insurance": req.body.carinsurance,
        "gas": req.body.cargas,
        "repairs": req.body.carrepairs,
        "mortgage": req.body.mortgage,
        "Student Loans": req.body.studentloans,
        "car": req.body.carloan,
        "Health Insurance": req.body.health,
        "Children's Needs": req.body.children,
        "Clothes": req.body.clothes
    },)
    .then(budget => {
        if(!budget) {
            return res.status(404).send({
                message: "Budget not found with id " + req.params.id
            });
        }
        res.send(budget);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            console.log(err);
            return res.status(404).send({
                message: "Budget not found with id " + req.params._id
                
            });                
        }
        return res.status(500).send({
            message: "Error updating Budget with id " + req.params._id
        });
    });
};