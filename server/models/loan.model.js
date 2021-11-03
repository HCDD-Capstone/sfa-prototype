const mongoose = require('mongoose');

const LoanSchema = mongoose.Schema({
    balance: Number,
    remainingTerm: Number,
    interestRate: Number,
    title: String
}, {
    timestamps: false
});

module.exports = mongoose.model('Loan', LoanSchema);