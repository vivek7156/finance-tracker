# Finance Tracker

A modern web application for tracking personal finances, managing expenses, and getting financial insights.

## Features

### 1. Dashboard
- Overview of income, expenses, and savings
- Interactive charts for visualizing spending habits
- Category-wise expense breakdown
- Monthly budget tracking with progress bar
- Calendar view of transactions
- Recent transactions list with edit/delete functionality
  ![screencapture-localhost-5173-2025-02-13-10_31_16](https://github.com/user-attachments/assets/f4dfdf04-58c5-4a01-9f4e-f33ea355d385)


### 2. Currency Converter
- Real-time currency conversion using Exchange Rate API
- Support for multiple currencies worldwide
- Popular currency conversion rates
- Clean and intuitive interface
  ![Screenshot 2025-02-13 103157](https://github.com/user-attachments/assets/95eb8727-6bb4-4e7a-81b8-8f1708d709a1)


### 3. Financial Insights
- Detailed analysis of spending patterns
- Budget usage tracking
- Category-wise spending breakdown
- Smart recommendations based on:
  - Budget adherence
  - High-spending categories
  - Savings goals
  - Category-specific saving tips
![screencapture-localhost-5173-insights-2025-02-13-10_32_07](https://github.com/user-attachments/assets/725372fc-e2a5-4b4a-9995-3f7be898ff50)

## Technology Stack

- **Frontend**: React.js with Vite
- **State Management**: Redux Toolkit & RTK Query
- **Styling**: Tailwind CSS with shadcn/ui components
- **Charts**: react-chartjs-2
- **Icons**: Lucide React
- **Routing**: React Router
- **API**: Exchange Rate API for currency conversion

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/finance-tracker.git
cd finance-tracker
```
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm run dev
```

### Project Structure 
```bash
finance-tracker/
├── src/
│   ├── components/         # Reusable UI components
│   ├── pages/             # Page components
│   │   ├── home/         # Dashboard page
│   │   ├── converter/    # Currency converter
│   │   └── insights/     # Financial insights
│   ├── store/            # Redux store configuration
│   └── lib/              # Utility functions
├── public/               # Static assets
└── ...config files
```

## Features in Detail

### Dashboard
- Track income and expenses
- Visualize spending patterns
- Set and monitor budget goals
- Manage transactions with CRUD operations
- View monthly calendar with transaction highlights
- 
### Currency Converter
- Convert between different currencies
- View popular currency exchange rates
- Real-time exchange rate updates
- Support for 170+ currencies
- 
### Financial Insights
- Get personalized financial recommendations
- Track budget usage percentage
- View category-wise spending breakdown
- Receive smart savings suggestions
