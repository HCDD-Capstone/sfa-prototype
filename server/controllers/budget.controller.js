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
    Budget.findByIdAndUpdate(req.params._id, {
        "categories":[
            {
                "food":
                {
                    "grocery store": req.body.food.grocery,
                    "fast food": req.body.food.fastfood,
                    "bar": req.body.food.bar
                }
            },
            {
                "rent":
                {
                    "payment": req.body.rent.rent,
                    "renter's insurance": req.body.rent.rentinsurance
                }
            },
            {
                "entertainment":
                {
                    "TV Subscriptions": req.body.entertainment.tv,
                    "Live Events": req.body.entertainment.events,
                    "Other": req.body.entertainment.otherentertainment
                }
            },
            {
                "utilities":
                {
                    "Gas": req.body.utilities.gasutils,
                    "water": req.body.utilities.water,
                    "Electricity": req.body.utilities.electricity
                }
            },
            {
                "car":
                {
                    "insurance": req.body.car.carinsurance,
                    "gas": req.body.car.cargas,
                    "repairs": req.body.car.carrepairs
                }
            },
            {
                "loans":
                {
                    "mortgage": req.body.loans.mortgage,
                    "Student Loans": req.body.loans.studentloans,
                    "car": req.body.loans.carloan
                }
            },
            {
                "other":
                {
                    "Health Insurance": req.body.other.health,
                    "Children's Needs": req.body.other.children,
                    "Clothes": req.body.other.clothes
                }
            }
        ]
    },)
    .then(budget => {
        if(!budget) {
            return res.status(404).send({
                message: "Budget not found with id " + req.params._id
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