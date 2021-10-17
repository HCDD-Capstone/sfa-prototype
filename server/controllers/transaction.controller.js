const Transaction = require('../models/transaction.model.js');

exports.create = (req, res) => {
    console.log(req.body);
    // Create a Transaction
    const transaction = new Transaction({
        name: req.body.name,
        date: req.body.date,
        price: req.body.price
    });

    // Save Transaction in the database
    transaction.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Transaction."
        });
    });
};

// Retrieve and return all transactions from the database.
exports.findAll = (req, res) => {
    Transaction.find()
    .then(transaction => {
        res.send(transaction);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving transactions."
        });
    });
};