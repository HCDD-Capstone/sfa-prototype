module.exports = (app) => {
    const transaction = require('../controllers/transaction.controller.js');

    // Create a new Transaction
    app.post('/transaction', transaction.create);

    // Retrieve all Transactions
    app.get('/transaction', transaction.findAll);
}