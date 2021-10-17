const mongoose = require('mongoose');

const TransactionSchema = mongoose.Schema({
    name: String,
    date: Date,
    price: Number
}, {
    timestamps: false
});

module.exports = mongoose.model('Transaction', TransactionSchema);