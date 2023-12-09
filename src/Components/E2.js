import React, { useState, useEffect } from "react";

const E2x = () => {
  const [baseCurrency, setBaseCurrency] = useState("USD"); // default base currency is USD
  const [exchangeRates, setExchangeRates] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch(
          // `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${baseCurrency}&apikey=e76d5f1eb4574dde9606b84a73e9cd25`
          `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${baseCurrency}&to_currency=JPY&apikey=e76d5f1eb4574dde9606b84a73e9cd25`
        );
        const data = await response.json();
        if (data["Realtime Currency Exchange Rate"]) {
          setExchangeRates(data["Realtime Currency Exchange Rate"]);
          setError(null);
        } else {
          setError(`Unable to retrieve exchange rates for ${baseCurrency}.`);
        }
      } catch (error) {
        setError(`Error retrieving exchange rates: ${error.message}`);
      }
    };
    fetchExchangeRates();
  }, [baseCurrency]);

  const handleBaseCurrencyChange = (event) => {
    setBaseCurrency(event.target.value);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Exchange Rates</h2>
      <div>
        <label htmlFor="base-currency">Base Currency:</label>
        <select
          id="base-currency"
          value={baseCurrency}
          onChange={handleBaseCurrencyChange}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="JPY">JPY</option>
          <option value="GBP">GBP</option>
        </select>
      </div>
      {exchangeRates ? (
        <table>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Name</th>
              <th>Exchange Rate</th>
              <th>Change</th>
              <th>Change %</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{exchangeRates["1. From_Currency Code"]}</td>
              <td>{exchangeRates["2. From_Currency Name"]}</td>
              <td>{exchangeRates["5. Exchange Rate"]}</td>
              <td>{exchangeRates["4. Change"]}</td>
              <td>{exchangeRates["6. Percent Change"]}</td>
            </tr>
            <tr>
              <td>{exchangeRates["1. To_Currency Code"]}</td>
              <td>{exchangeRates["3. To_Currency Name"]}</td>
              <td>{1 / exchangeRates["5. Exchange Rate"]}</td>
              <td>-{exchangeRates["4. Change"]}</td>
              <td>{exchangeRates["6. Percent Change"]}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>Loading exchange rates...</p>
      )}
    </div>
  );
};

export default E2x;
