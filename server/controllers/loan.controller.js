const Loan = require('../models/loan.model.js');

exports.create = (req, res) => {
    console.log(req.body);
    // Create a Loan
    const loan = new Loan({
        balance: req.body.balance,
        remainingTerm: req.body.remainingTerm,
        interestRate: req.body.interestRate,
        title: req.body.title
    });

    // Save loan in the database
    loan.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Loan."
        });
    });
};

// Retrieve and return all transactions from the database.
exports.findAll = (req, res) => {
    Loan.find()
    .then(loan => {
        res.send(loan);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving loans."
        });
    });
};

// Update a loan identified by the title in the request
exports.update = (req, res) => {
    Loan.findByIdAndUpdate(req.params.title, {
        balance: req.body.balance,
        remainingTerm: req.body.remainingTerm,
        interestRate: req.body.interestRate
    }, {new: true})
    .then(loan => {
        if(!loan) {
            return res.status(404).send({
                message: "Loan not found with title " + req.params.title
            });
        }
        res.send(loan);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Loan not found with title " + req.params.title
            });                
        }
        return res.status(500).send({
            message: "Error updating loan with title " + req.params.title
        });
    });
};