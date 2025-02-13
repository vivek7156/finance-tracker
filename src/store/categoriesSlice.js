import { createSlice } from '@reduxjs/toolkit';

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: ['Rent', 'Groceries', 'Utilities', 'Entertainment', 'Others'],
  reducers: {},
});

export default categoriesSlice.reducer;