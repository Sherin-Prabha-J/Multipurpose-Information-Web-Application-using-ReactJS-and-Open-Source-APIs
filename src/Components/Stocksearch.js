import React, { useState } from "react";

const Stocksearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [tickers, setTickers] = useState([]);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchTerm}&apikey=RBOGO32OIH9JDGVL`
      );
      const data = await response.json();
      if (data.bestMatches) {
        setTickers(
          data.bestMatches.map((match) => ({
            symbol: match["1. symbol"],
            name: match["2. name"],
          }))
        );
        console.log(tickers);
      } else {
        setTickers([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <label>
          Search Term:
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
        </label>
        <button type="submit">Search</button>
      </form>
      <select value={searchTerm} onChange={handleSearchTermChange}>
        <option value="">Select a symbol</option>
        {tickers.map((ticker) => (
          <option key={ticker.symbol} value={ticker.symbol}>
            {ticker.symbol} - {ticker.name}
          </option>
        ))}
      </select>
      {/* <ul>
        {tickers.map((ticker) => (
          <li key={ticker.symbol}>
            {ticker.symbol} - {ticker.name}
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default Stocksearch;
