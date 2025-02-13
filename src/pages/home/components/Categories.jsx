import React from 'react';
import { Card } from "@/components/ui/card";

const Categories = ({ categories }) => {
  return (
    <div className="mb-4 md:mb-6">
      <h3 className="text-lg font-semibold mb-4">Categories with Biggest Expense</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-6">
        {categories.map((category, index) => (
          <Card key={index} className="p-3 md:p-6">
            <div className="text-xl md:text-2xl mb-2">{category.icon}</div>
            <div className="text-xs md:text-sm font-medium">{category.name}</div>
            <div className="text-xs md:text-sm text-gray-500">₹{category.amount}</div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Categories;