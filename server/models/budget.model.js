const mongoose = require('mongoose');

const BudgetSchema = mongoose.Schema({
    "grocery store": Number,
    "fast food": Number,
    "bar": Number,
    "payment": Number,
    "renter's insurance": Number,
    "TV Subscriptions": Number,
    "Live Events": Number,
    "Other": Number,
    "Gas": Number,
    "water": Number,
    "Electricity": Number,
    "insurance": Number,
    "gas": Number,
    "repairs": Number,
    "mortgage": Number,
    "Student Loans": Number,
    "car": Number,
    "Health Insurance": Number,
    "Children's Needs": Number,
    "Clothes": Number,
    }, {
    timestamps: false
});

module.exports = mongoose.model('Budget', BudgetSchema);