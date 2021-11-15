const mongoose = require('mongoose');

const BudgetSchema = mongoose.Schema({
    "categories":[
        {
            "food":
            {
                "grocery store": Number,
                "fast food": Number,
                "bar": Number
            }
        },
        {
            "rent":
            {
                "payment": Number,
                "renter's insurance": Number
            }
        },
        {
            "entertainment":
            {
                "TV Subscriptions": Number,
                "Live Events": Number,
                "Other": Number
            }
        },
        {
            "utilities":
            {
                "Gas": Number,
                "water": Number,
                "Electricity": Number
            }
        },
        {
            "car":
            {
                "insurance": Number,
                "gas": Number,
                "repairs": Number
            }
        },
        {
            "loans":
            {
                "mortgage": Number,
                "Student Loans": Number,
                "car": Number
            }
        },
        {
            "other":
            {
                "Health Insurance": Number,
                "Children's Needs": Number,
                "Clothes": Number
            }
        }
    ],
    title: String
    }, {
    timestamps: false
});

module.exports = mongoose.model('Budget', BudgetSchema);