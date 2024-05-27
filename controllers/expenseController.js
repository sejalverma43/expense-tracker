const expenseService = require('../services/expenseService');

exports.createExpense = async (req, res) => {
    try {
        const expense = await expenseService.createExpense(req.body);
        res.status(201).send(expense);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getExpenses = async (req, res) => {
    try {
        const expenses = await expenseService.getExpenses();
        res.status(200).send(expenses);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateExpense = async (req, res) => {
    try {
        const expense = await expenseService.updateExpense(req.params.id, req.body);
        res.status(200).send(expense);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteExpense = async (req, res) => {
    try {
        await expenseService.deleteExpense(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
};
