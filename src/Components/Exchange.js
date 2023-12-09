import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/exchange.css";

const Exchange = () => {
  const [exchangeRates, setExchangeRates] = useState({});
  const [selectedCurrency, setSelectedCurrency] = useState("JPY");
  const [currencies, setCurrencies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://api.exchangerate-api.com/v4/latest/USD")
      .then((response) => {
        setExchangeRates(response.data.rates);
        setCurrencies(Object.keys(response.data.rates));
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="exchange-container">
      {" "}
      {/* Apply CSS class to the container */}
      <h2>Today's Currency Exchange Rates (USD)</h2>
      <div className="currency-select">
        <label htmlFor="currency">Select Currency: </label>
        <select
          id="currency"
          value={selectedCurrency}
          onChange={handleCurrencyChange}
        >
          {currencies.map((currency) => (
            <option className="options" key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      {exchangeRates && (
        <div className="exchange-details">
          <h3>{selectedCurrency}</h3>
          <p>
            Exchange Rate: <span> {exchangeRates[selectedCurrency]} </span>
            {selectedCurrency}
          </p>
        </div>
      )}
    </div>
  );
};

export default Exchange;
