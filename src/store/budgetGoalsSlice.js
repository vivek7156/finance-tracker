import { createSlice } from '@reduxjs/toolkit';

const budgetGoalsSlice = createSlice({
  name: 'budgetGoals',
  initialState: { income: 0, expenses: 0, savings: 0 },
  reducers: {
    setBudgetGoals: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setBudgetGoals } = budgetGoalsSlice.actions;
export default budgetGoalsSlice.reducer;