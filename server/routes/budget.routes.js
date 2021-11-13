module.exports = (app) => {
    const budget = require('../controllers/budget.controller.js');

    // Retrieve all Budgets
    app.get('/budgets', budget.findAll);

    // Update a Budget
    app.put('/budgets/:id', budget.update);
}