import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowUp, DollarSign, PieChart, TrendingUp, AlertCircle } from 'lucide-react';

const InsightsPage = () => {
  const transactions = useSelector(state => state.transactions);
  const budgetData = useSelector(state => state.budgetGoals);
  const categories = useSelector(state => state.categories);
  const [budgetGoal, setBudgetGoal] = useState(() => {
    return JSON.parse(localStorage.getItem('budgetGoal')) || 10000;
  });

  const calculateCategorySpending = () => {
    return categories.map(categoryName => {
      const amount = transactions
        .filter(t => t.type === 'expense' && t.category === categoryName)
        .reduce((sum, t) => sum + t.amount, 0);

      return {
        name: categoryName,
        amount: amount
      };
    }).sort((a, b) => b.amount - a.amount);
  };

  const categorySpending = calculateCategorySpending();
  const totalExpenses = categorySpending.reduce((sum, category) => sum + category.amount, 0);
  const percentageOfBudget = (totalExpenses / budgetGoal) * 100;

  const getSuggestions = () => {
    const suggestions = [];

    if (totalExpenses > budgetGoal) {
      suggestions.push("You have exceeded your budget. Consider reducing your spending.");
      suggestions.push("Review your recent transactions and identify areas where you can cut back.");
      suggestions.push("Consider setting a stricter budget for high-spending categories.");
    } else {
      suggestions.push("You are within your budget. Keep up the good work!");
      suggestions.push("Continue monitoring your spending to ensure you stay within your budget.");
      suggestions.push("Consider saving any surplus funds for future expenses or investments.");
    }

    const highSpendingCategories = categorySpending.filter(category => category.amount > budgetGoal * 0.2);
    if (highSpendingCategories.length > 0) {
      suggestions.push("High spending detected in the following categories:");
      highSpendingCategories.forEach(category => {
        suggestions.push(`- ${category.name}: ₹${category.amount}`);
        if (category.name === 'Groceries') {
          suggestions.push("Consider using coupons or buying in bulk to save on groceries.");
        } else if (category.name === 'Entertainment') {
          suggestions.push("Look for free or low-cost entertainment options.");
        } else if (category.name === 'Utilities') {
          suggestions.push("Try to reduce utility usage by being more energy-efficient.");
        } else if (category.name === 'Rent') {
          suggestions.push("If possible, consider negotiating your rent or finding a more affordable place.");
        } else {
          suggestions.push(`Look for ways to reduce spending in the ${category.name} category.`);
        }
      });
    }

    if (budgetData.savings < budgetGoal * 0.1) {
      suggestions.push("Your savings are below 10% of your budget goal. Consider increasing your savings.");
      suggestions.push("Automate your savings to ensure you save a portion of your income regularly.");
    } else {
      suggestions.push("Your savings are on track. Keep up the good work!");
      suggestions.push("Consider investing your savings to grow your wealth over time.");
    }

    return suggestions;
  };

  const suggestions = getSuggestions();

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <PieChart className="w-8 h-8 text-blue-500" />
        <h1 className="text-2xl font-bold">Financial Insights</h1>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500 rounded-full">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Expenses</p>
                <p className="text-xl font-bold">₹{totalExpenses.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500 rounded-full">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Budget Goal</p>
                <p className="text-xl font-bold">₹{budgetGoal.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={`bg-gradient-to-br ${
          percentageOfBudget > 100 
            ? 'from-red-50 to-red-100' 
            : 'from-green-50 to-green-100'
        }`}>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full ${
                percentageOfBudget > 100 ? 'bg-red-500' : 'bg-green-500'
              }`}>
                <ArrowUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Budget Usage</p>
                <p className="text-xl font-bold">{percentageOfBudget.toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Spending */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Category Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categorySpending.map(category => (
                <div key={category.name} className="relative">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{category.name}</span>
                    <span className="text-sm font-medium">₹{category.amount}</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-blue-500 rounded-full"
                      style={{ width: `${(category.amount / totalExpenses) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Suggestions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg ${
                    suggestion.startsWith('High') || suggestion.startsWith('You have exceeded')
                      ? 'bg-red-50 border border-red-200'
                      : suggestion.startsWith('You are within') || suggestion.startsWith('Your savings are on track')
                      ? 'bg-green-50 border border-green-200'
                      : 'bg-blue-50 border border-blue-200'
                  }`}
                >
                  <p className="text-sm">{suggestion}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InsightsPage;