import React from 'react';

const StatsCard = ({ data }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
      <div className="p-4 bg-white rounded-lg shadow-sm">
        <div className="flex items-center gap-2 text-red-500 mb-2">
          <div className="p-1 bg-red-100 rounded">🛡️</div>
          <span className="text-sm md:text-base">Expenses</span>
        </div>
        <p className="text-xl md:text-2xl font-bold">₹{data.expenses.toFixed(2)}</p>
      </div>
      <div className="p-4 bg-white rounded-lg shadow-sm">
        <div className="flex items-center gap-2 text-blue-500 mb-2">
          <div className="p-1 bg-blue-100 rounded">💰</div>
          <span className="text-sm md:text-base">Total</span>
        </div>
        <p className="text-xl md:text-2xl font-bold">₹{(data.income - data.expenses).toFixed(2)}</p>
      </div>
      <div className="p-4 bg-white rounded-lg shadow-sm sm:col-span-2 lg:col-span-1">
        <div className="flex items-center gap-2 text-green-500 mb-2">
          <div className="p-1 bg-green-100 rounded">📈</div>
          <span className="text-sm md:text-base">Revenues</span>
        </div>
        <p className="text-xl md:text-2xl font-bold">₹{data.income.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default StatsCard;