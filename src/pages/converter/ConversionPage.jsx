import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowRight, RefreshCcw, TrendingUp, DollarSign } from 'lucide-react';
import { useGetExchangeRatesQuery } from '../../store/exchangeRatesApi';

const ConversionPage = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const { data: exchangeRates, error, isLoading } = useGetExchangeRatesQuery(fromCurrency);

  const popularCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'INR'];

  const currencies = [
    "USD", "AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", "AZN", "BAM", "BBD", "BDT", "BGN", "BHD", "BIF", "BMD", "BND", "BOB", "BRL", "BSD", "BTN", "BWP", "BYN", "BZD", "CAD", "CDF", "CHF", "CLP", "CNY", "COP", "CRC", "CUP", "CVE", "CZK", "DJF", "DKK", "DOP", "DZD", "EGP", "ERN", "ETB", "EUR", "FJD", "FKP", "FOK", "GBP", "GEL", "GGP", "GHS", "GIP", "GMD", "GNF", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF", "IDR", "ILS", "IMP", "INR", "IQD", "IRR", "ISK", "JEP", "JMD", "JOD", "JPY", "KES", "KGS", "KHR", "KID", "KMF", "KRW", "KWD", "KYD", "KZT", "LAK", "LBP", "LKR", "LRD", "LSL", "LYD", "MAD", "MDL", "MGA", "MKD", "MMK", "MNT", "MOP", "MRU", "MUR", "MVR", "MWK", "MXN", "MYR", "MZN", "NAD", "NGN", "NIO", "NOK", "NPR", "NZD", "OMR", "PAB", "PEN", "PGK", "PHP", "PKR", "PLN", "PYG", "QAR", "RON", "RSD", "RUB", "RWF", "SAR", "SBD", "SCR", "SDG", "SEK", "SGD", "SHP", "SLE", "SLL", "SOS", "SRD", "SSP", "STN", "SYP", "SZL", "THB", "TJS", "TMT", "TND", "TOP", "TRY", "TTD", "TVD", "TWD", "TZS", "UAH", "UGX", "UYU", "UZS", "VES", "VND", "VUV", "WST", "XAF", "XCD", "XDR", "XOF", "XPF", "YER", "ZAR", "ZMW", "ZWL"
  ];

  const handleConvert = () => {
    if (!amount || isNaN(amount)) {
      setError('Please enter a valid amount');
      return;
    }

    const rate = exchangeRates?.conversion_rates[toCurrency];
    if (!rate) {
      setError('Exchange rate not available');
      return;
    }

    const result = parseFloat(amount) * rate;
    setConvertedAmount(result.toFixed(2));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <DollarSign className="w-8 h-8 text-blue-500" />
        <h1 className="text-2xl font-bold">Currency Converter</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Converter Card */}
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCcw className="w-5 h-5" />
                Convert Currency
              </CardTitle>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter amount"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                    <select
                      value={fromCurrency}
                      onChange={(e) => setFromCurrency(e.target.value)}
                      className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {currencies.map((currency) => (
                        <option key={currency} value={currency}>{currency}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                    <select
                      value={toCurrency}
                      onChange={(e) => setToCurrency(e.target.value)}
                      className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {currencies.map((currency) => (
                        <option key={currency} value={currency}>{currency}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  onClick={handleConvert}
                  disabled={isLoading}
                  className={`w-full p-4 rounded-lg text-white font-medium transition-colors ${
                    isLoading 
                      ? 'bg-blue-300 cursor-not-allowed' 
                      : 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700'
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <RefreshCcw className="w-5 h-5 animate-spin" />
                      Converting...
                    </span>
                  ) : 'Convert'}
                </button>

                {convertedAmount && (
                  <div className="mt-6 p-6 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="flex items-center justify-center gap-4">
                      <span className="text-xl">
                        {amount} {fromCurrency}
                      </span>
                      <ArrowRight className="w-6 h-6 text-blue-500" />
                      <span className="text-xl font-semibold text-blue-600">
                        {convertedAmount} {toCurrency}
                      </span>
                    </div>
                    <div className="text-center text-sm text-blue-600 mt-2">
                      1 {fromCurrency} = {exchangeRates?.conversion_rates[toCurrency]} {toCurrency}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Popular Rates Card */}
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Popular Rates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {popularCurrencies.map((currency) => (
                  currency !== fromCurrency && (
                    <div 
                      key={currency} 
                      className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">1 {fromCurrency}</span>
                        <span className="font-semibold">
                          {exchangeRates?.conversion_rates[currency]} {currency}
                        </span>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ConversionPage;