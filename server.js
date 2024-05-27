const express = require('express');
const cron = require('cron');
const expenseRoutes = require('./routes/expenses');
const { updateRecurringExpenses } = require('./services/expenseService');

const app = express();
app.use(express.json());

app.use('/api/expenses', expenseRoutes);  // Make sure the prefix matches

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Schedule the update function to run daily at midnight
const job = new cron.CronJob('0 0 * * *', updateRecurringExpenses);
job.start();
