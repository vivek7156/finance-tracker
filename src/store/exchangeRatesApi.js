import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const exchangeRatesApi = createApi({
  reducerPath: 'exchangeRatesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://v6.exchangerate-api.com/v6/' }),
  endpoints: (builder) => ({
    getExchangeRates: builder.query({
      query: (currency) => `88be81fd66cd49f5832598e3/latest/${currency}`,
    }),
  }),
});

export const { useGetExchangeRatesQuery } = exchangeRatesApi;
export default exchangeRatesApi;