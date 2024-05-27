const axios = require('axios');

const BASE_URL = 'http://strapi.koders.in/api/expenses/';

exports.createExpense = async (data) => {
    const response = await axios.post(BASE_URL, data);
    return response.data;
};

exports.getExpenses = async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
};

exports.updateExpense = async (id, data) => {
    const response = await axios.put(`${BASE_URL}${id}`, data);
    return response.data;
};

exports.deleteExpense = async (id) => {
    await axios.delete(`${BASE_URL}${id}`);
};

exports.updateRecurringExpenses = async () => {
    try {
        const response = await axios.get(BASE_URL);
        const expenses = response.data;

        expenses.forEach(async (expense) => {
            if (expense.frequency !== 'One-Time') {
                let incrementAmount;
                const baseAmount = expense.base || 0;

                switch (expense.frequency) {
                    case 'Daily':
                        incrementAmount = baseAmount;
                        break;
                    case 'Weekly':
                        incrementAmount = baseAmount / 7;
                        break;
                    case 'Monthly':
                        incrementAmount = baseAmount / 30;
                        break;
                    case 'Quarterly':
                        incrementAmount = baseAmount / 90;
                        break;
                    case 'Yearly':
                        incrementAmount = baseAmount / 365;
                        break;
                }

                expense.amount += incrementAmount;

                await axios.put(`${BASE_URL}${expense.id}`, expense);
            }
        });
    } catch (error) {
        console.error(error.message);
    }
};
