import React, { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import Modal from 'react-modal';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const BudgetChart = ({ spendingData, incomeData, addTransaction }) => {
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Others');
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const [newBudgetGoal, setNewBudgetGoal] = useState('');
  const [budgetGoal, setBudgetGoal] = useState(() => {
    return JSON.parse(localStorage.getItem('budgetGoal')) || 10000;
  });

  const incomeCategories = ['Salary', 'Investments', 'Freelancing', 'Others'];
  const expenseCategories = ['Rent', 'Groceries', 'Utilities', 'Entertainment', 'Others'];

  const totalExpenses = spendingData.datasets[0].data.reduce((acc, curr) => acc + curr, 0);
  const progressPercentage = Math.min((totalExpenses / budgetGoal) * 100, 100);

  const handleAddIncome = () => {
    if (amount <= 0 || description === '') return;

    const transaction = {
      id: Date.now(),
      type: 'income',
      amount: parseFloat(amount),
      description,
      category,
      date: new Date().toISOString(),
    };

    console.log('Adding income transaction:', transaction);
    addTransaction(transaction);
    setIsIncomeModalOpen(false);
    setAmount('');
    setDescription('');
    setCategory('Salary');
  };

  const handleSetBudgetGoal = () => {
    if (newBudgetGoal && !isNaN(newBudgetGoal) && parseFloat(newBudgetGoal) > 0) {
      setBudgetGoal(parseFloat(newBudgetGoal));
      localStorage.setItem('budgetGoal', newBudgetGoal);
      setIsBudgetModalOpen(false);
      setNewBudgetGoal('');
    }
  };

  const handleAddExpense = () => {
    if (amount <= 0 || description === '') return;

    const transaction = {
      id: Date.now(),
      type: 'expense',
      amount: parseFloat(amount),
      description,
      category,
      date: new Date().toISOString(),
    };

    console.log('Adding expense transaction:', transaction);
    addTransaction(transaction);
    setIsExpenseModalOpen(false);
    setAmount('');
    setDescription('');
    setCategory('Rent');
  };

  const openIncomeModal = () => {
    setAmount('');
    setDescription('');
    setCategory('Salary');
    setIsIncomeModalOpen(true);
  };

  const openExpenseModal = () => {
    setAmount('');
    setDescription('');
    setCategory('Rent');
    setIsExpenseModalOpen(true);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Spending Habits</h2>
          <button
            onClick={openExpenseModal}
            className="bg-red-500 text-white rounded-md p-2"
          >
            Add Expense
          </button>
        </div>

        {/* Budget Progress Bar */}
        <div className="mb-9">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Monthly Budget</span>
            <span className="text-sm font-medium">
              ₹{totalExpenses.toFixed(2)} / ₹{budgetGoal.toFixed(2)}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full transition-all duration-500 ${progressPercentage >= 100
                  ? 'bg-red-500'
                  : progressPercentage >= 75
                    ? 'bg-yellow-500'
                    : 'bg-green-500'
                }`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <button
            onClick={() => {
              setNewBudgetGoal(budgetGoal.toString());
              setIsBudgetModalOpen(true);
            }}
            className="mt-2 text-xs text-blue-500 hover:text-blue-700"
          >
            Set Budget Goal
          </button>
        </div>
        <Bar data={spendingData} />
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Income Sources</h2>
          <button
            onClick={openIncomeModal}
            className="bg-green-500 text-white rounded-md p-2"
          >
            Add Income
          </button>
        </div>
        <Pie data={incomeData} />
      </div>

      {/* Income Modal */}
      <Modal
        isOpen={isIncomeModalOpen}
        onRequestClose={() => setIsIncomeModalOpen(false)}
        contentLabel="Add Income"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2 className="text-lg font-semibold mb-4">Add Income</h2>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border rounded-md p-2 w-full mb-4"
          placeholder="Amount (₹)"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border rounded-md p-2 w-full mb-4"
          placeholder="Description"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded-md p-2 w-full mb-4"
        >
          {incomeCategories.map((incomeCategory) => (
            <option key={incomeCategory} value={incomeCategory}>
              {incomeCategory}
            </option>
          ))}
        </select>
        <button
          onClick={handleAddIncome}
          className={`rounded-md p-2 w-full ${amount > 0 && description ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
          disabled={amount <= 0 || description === ''}
        >
          Add
        </button>
      </Modal>

      {/* Expense Modal */}
      <Modal
        isOpen={isExpenseModalOpen}
        onRequestClose={() => setIsExpenseModalOpen(false)}
        contentLabel="Add Expense"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2 className="text-lg font-semibold mb-4">Add Expense</h2>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border rounded-md p-2 w-full mb-4"
          placeholder="Amount (₹)"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border rounded-md p-2 w-full mb-4"
          placeholder="Description"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded-md p-2 w-full mb-4"
        >
          {expenseCategories.map((expenseCategory) => (
            <option key={expenseCategory} value={expenseCategory}>
              {expenseCategory}
            </option>
          ))}
        </select>
        <button
          onClick={handleAddExpense}
          className={`rounded-md p-2 w-full ${amount > 0 && description ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
          disabled={amount <= 0 || description === ''}
        >
          Add
        </button>
      </Modal>

      {/* Budget Goal Modal */}
      <Modal
        isOpen={isBudgetModalOpen}
        onRequestClose={() => setIsBudgetModalOpen(false)}
        contentLabel="Set Budget Goal"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2 className="text-lg font-semibold mb-4">Set Monthly Budget Goal</h2>
        <input
          type="number"
          value={newBudgetGoal}
          onChange={(e) => setNewBudgetGoal(e.target.value)}
          className="border rounded-md p-2 w-full mb-4"
          placeholder="Enter budget goal (₹)"
        />
        <div className="flex justify-end gap-4">
          <button
            onClick={() => setIsBudgetModalOpen(false)}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSetBudgetGoal}
            className={`px-4 py-2 rounded-md ${newBudgetGoal && !isNaN(newBudgetGoal) && parseFloat(newBudgetGoal) > 0
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            disabled={!newBudgetGoal || isNaN(newBudgetGoal) || parseFloat(newBudgetGoal) <= 0}
          >
            Save
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default BudgetChart;