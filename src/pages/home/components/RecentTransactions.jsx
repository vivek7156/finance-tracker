import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowDown, ArrowUp, Edit, Trash } from 'lucide-react';
import Modal from 'react-modal';

const RecentTransactions = ({ transactions, editTransaction, deleteTransaction }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState(null);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Others');

  const openEditModal = (transaction) => {
    setCurrentTransaction(transaction);
    setAmount(transaction.amount);
    setDescription(transaction.description);
    setCategory(transaction.category);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (transaction) => {
    setCurrentTransaction(transaction);
    setIsDeleteModalOpen(true);
  };

  const handleEditTransaction = () => {
    if (amount <= 0 || description === '') return;

    const updatedTransaction = {
      ...currentTransaction,
      amount: parseFloat(amount),
      description,
      category,
    };

    editTransaction(updatedTransaction);
    setIsEditModalOpen(false);
    setAmount('');
    setDescription('');
    setCategory('Others');
  };

  const handleDeleteTransaction = () => {
    setIsDeleteModalOpen(false);
    deleteTransaction(currentTransaction.id);
    setCurrentTransaction(null);
  };

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div key={transaction.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-gray-50 rounded-lg gap-2"
            >
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="p-2 bg-white rounded-full">
                  {transaction.type === 'income' ? (
                    <ArrowDown className="w-4 h-4 text-green-500" />
                  ) : (
                    <ArrowUp className="w-4 h-4 text-red-500" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm md:text-base">
                    {transaction.description}
                  </div>
                  <div className="text-xs md:text-sm text-gray-500">
                    {transaction.category} • {new Date(transaction.date).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className={`font-medium text-sm md:text-base ${
                  transaction.type === 'income' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}₹{Math.abs(transaction.amount)}
                </div>
                <div>
                <button onClick={() => openEditModal(transaction)} className="text-blue-500">
                  <Edit size={16} />
                </button>
                <button onClick={() => openDeleteModal(transaction)} className="text-red-500">
                  <Trash size={16} />
                </button>
                </div>
              </div>
            </div>
          ))}
          {transactions.length === 0 && (
            <div className="text-center text-gray-500 py-4">
              No transactions yet
            </div>
          )}
        </div>
      </CardContent>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        contentLabel="Edit Transaction"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2 className="text-lg font-semibold mb-4">Edit Transaction</h2>
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
          <option value="Rent">Rent</option>
          <option value="Groceries">Groceries</option>
          <option value="Utilities">Utilities</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Others">Others</option>
        </select>
        <button
          onClick={handleEditTransaction}
          className={`rounded-md p-2 w-full ${amount > 0 && description ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
          disabled={amount <= 0 || description === ''}
        >
          Save
        </button>
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        contentLabel="Delete Transaction"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2 className="text-lg font-semibold mb-4">Delete Transaction</h2>
        <p>Are you sure you want to delete this transaction?</p>
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={() => setIsDeleteModalOpen(false)}
            className="bg-gray-300 text-gray-700 rounded-md p-2"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteTransaction}
            className="bg-red-500 text-white rounded-md p-2"
          >
            Delete
          </button>
        </div>
      </Modal>
    </Card>
  );
};

export default RecentTransactions;