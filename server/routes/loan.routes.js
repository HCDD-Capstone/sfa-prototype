module.exports = (app) => {
    const loan = require('../controllers/loan.controller.js');

    // Create a new Loan
    app.post('/loans', loan.create);

    // Retrieve all Loans
    app.get('/loans', loan.findAll);

    // Update a Loan
    app.put('/loans/:title', loan.update);
}