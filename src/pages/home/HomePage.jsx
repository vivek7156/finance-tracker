import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../pages/home/components/Header';
import StatsCard from '../../pages/home/components/StatsCard';
import BudgetChart from '../../pages/home/components/BudgetChart';
import Categories from '../../pages/home/components/Categories';
import Calendar from '../../pages/home/components/Calender';
import RecentTransactions from '../../pages/home/components/RecentTransactions';
import { addTransaction, editTransaction, deleteTransaction } from '../../store/transactionsSlice';
import { setBudgetGoals } from '../../store/budgetGoalsSlice';

const HomePage = () => {
  const dispatch = useDispatch();
  const transactions = useSelector(state => state.transactions);
  const budgetGoals = useSelector(state => state.budgetGoals);
  const categories = useSelector(state => state.categories);

  useEffect(() => {
    const storedBudgetData = JSON.parse(localStorage.getItem('budgetData')) || { income: 0, expenses: 0, savings: 0 };
    const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    const storedCalendarHighlights = storedTransactions.map(transaction => new Date(transaction.date).getDate());

    dispatch(setBudgetGoals(storedBudgetData));
    storedTransactions.forEach(transaction => dispatch(addTransaction(transaction)));
  }, [dispatch]);

  const handleAddTransaction = (transaction) => {
    const updatedTransactions = [...transactions, transaction];
    dispatch(addTransaction(transaction));
    const newBudgetData = calculateBudgetData(updatedTransactions);
    dispatch(setBudgetGoals(newBudgetData));
    updateLocalStorage(updatedTransactions, newBudgetData);
  };

  const handleEditTransaction = (updatedTransaction) => {
    const updatedTransactions = transactions.map(transaction =>
      transaction.id === updatedTransaction.id ? updatedTransaction : transaction
    );
    dispatch(editTransaction(updatedTransaction));
    const newBudgetData = calculateBudgetData(updatedTransactions);
    dispatch(setBudgetGoals(newBudgetData));
    updateLocalStorage(updatedTransactions, newBudgetData);
  };

  const handleDeleteTransaction = (id) => {
    const updatedTransactions = transactions.filter(transaction => transaction.id !== id);
    dispatch(deleteTransaction(id));
    const newBudgetData = calculateBudgetData(updatedTransactions);
    dispatch(setBudgetGoals(newBudgetData));
    updateLocalStorage(updatedTransactions, newBudgetData);
  };

  const updateLocalStorage = (newTransactions, newBudgetData) => {
    localStorage.setItem('transactions', JSON.stringify(newTransactions));
    localStorage.setItem('budgetData', JSON.stringify(newBudgetData));
  };

  const calculateCategories = () => {
    return categories.map(categoryName => {
      const amount = transactions
        .filter(t => t.type === 'expense' && t.category === categoryName)
        .reduce((sum, t) => sum + t.amount, 0);

      const icons = {
        'Rent': '🏠',
        'Groceries': '🛒',
        'Utilities': '💡',
        'Entertainment': '🎮',
        'Others': '📦'
      };

      return {
        icon: icons[categoryName],
        name: categoryName,
        amount: amount
      };
    }).sort((a, b) => b.amount - a.amount);
  };

  const calculateSpendingData = () => {
    const data = categories.map((category) =>
      transactions
        .filter((transaction) => transaction.type === 'expense' && transaction.category === category)
        .reduce((acc, transaction) => acc + transaction.amount, 0)
    );
    return {
      labels: categories,
      datasets: [
        {
          label: 'Expenses',
          data,
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    };
  };

  const calculateIncomeData = () => {
    const incomeCategories = ['Salary', 'Investments', 'Freelancing', 'Others'];
    const data = incomeCategories.map((category) =>
      transactions
        .filter((transaction) => transaction.type === 'income' && transaction.category === category)
        .reduce((acc, transaction) => acc + transaction.amount, 0)
    );
    return {
      labels: incomeCategories,
      datasets: [
        {
          label: 'Income',
          data,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
        },
      ],
    };
  };

  const calculateBudgetData = (transactions) => {
    const income = transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((sum, transaction) => sum + transaction.amount, 0);

    const expenses = transactions
      .filter(transaction => transaction.type === 'expense')
      .reduce((sum, transaction) => sum + transaction.amount, 0);

    const savings = income - expenses;

    return { income, expenses, savings };
  };

  const budgetData = calculateBudgetData(transactions);

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-50">
      <Header />
      <StatsCard data={budgetData} />
      <BudgetChart
        spendingData={calculateSpendingData()}
        incomeData={calculateIncomeData()}
        addTransaction={handleAddTransaction}
      />
      <Categories categories={calculateCategories()} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Calendar highlights={transactions.map(transaction => new Date(transaction.date).getDate())} />
        <RecentTransactions
          transactions={transactions}
          editTransaction={handleEditTransaction}
          deleteTransaction={handleDeleteTransaction}
        />
      </div>
    </div>
  );
};

export default HomePage;