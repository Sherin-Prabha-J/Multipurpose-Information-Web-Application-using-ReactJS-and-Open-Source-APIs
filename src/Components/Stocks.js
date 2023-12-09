import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import Stocksearch from "./Stocksearch";
import "../css/stocks.css";

const Stock = () => {
  const [currSymbol, setCurrSymbol] = useState("IBM");
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [tickers, setTickers] = useState([]);

  const fetchStockData = async () => {
    try {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${currSymbol}&apikey=RBOGO32OIH9JDGVL`
      );
      const data = await response.json();
      console.log(data);
      if (data["Error Message"]) {
        setError(data["Error Message"]);
      } else {
        setStockData(data["Time Series (Daily)"]);
      }
    } catch (error) {
      setError("Error fetching stock data");
    }
  };
  useEffect(() => {
    fetchStockData();
  }, [currSymbol]);

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  if (!stockData) {
    return <div>Loading...</div>;
  }

  const stockRows = Object.entries(stockData).map(([date, data]) => (
    <TableRow key={date}>
      <TableCell>{date}</TableCell>
      <TableCell>{data["1. open"]}</TableCell>
      <TableCell>{data["2. high"]}</TableCell>
      <TableCell>{data["3. low"]}</TableCell>
      <TableCell>{data["4. close"]}</TableCell>
      <TableCell>{data["5. adjusted close"]}</TableCell>
      <TableCell>{data["6. volume"]}</TableCell>
      <TableCell>{data["7. dividend amount"]}</TableCell>
      <TableCell>{data["8. split coefficient"]}</TableCell>
    </TableRow>
  ));

  /*  SEARCH COMPONENT */

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
    console.log("the new value is ", event.target.value);
  };

  const customHandle = (event) => {
    console.log("the selected value is", event.target.value);
    setCurrSymbol(`${event.target.value}`);
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
      } else {
        setTickers([]);
      }
    } catch (error) {
      console.error(error);
    }
  };
  /*  /SEARCH COMPONENT */

  return (
    <div className="stock__container">
      {/* searchbar */}
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchTermChange}
            className="input__field"
            placeholder="Search Term"
          />
          <button type="submit" className="submit__button">Search</button>
        </form>
        <select onChange={customHandle}  className="select__options">
          <option value="">Select a symbol</option>
          {tickers.map((ticker) => (
            <option key={ticker.symbol} value={ticker.symbol}>
              {ticker.symbol} - {ticker.name}
            </option>
          ))}
        </select>
      {/* searchbar */}
      <Heading>{currSymbol} Daily Stock Details</Heading>
      <Table>
        <thead>
          <TableRow>
            <TableHeader>Date</TableHeader>
            <TableHeader>Open</TableHeader>
            <TableHeader>High</TableHeader>
            <TableHeader>Low</TableHeader>
            <TableHeader>Close</TableHeader>
            <TableHeader>Adjusted Close</TableHeader>
            <TableHeader>Volume</TableHeader>
            <TableHeader>Dividend Amount</TableHeader>
            <TableHeader>Split Coefficient</TableHeader>
          </TableRow>
        </thead>
        <tbody>{stockRows}</tbody>
      </Table>
    </div>
  );
};

export default Stock;


const Heading = styled.h2`
  font-size: 24px;
  margin-bottom: 16px;
`;

const Table = styled.table`
  border-collapse: collapse;
  margin-bottom: 32px;
`;

const TableHeader = styled.th`
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;

const TableRow = styled.tr`
  height: 60px;
  &:nth-child(even) {
    border-left: 1px solid #fff;
    border-right: 1px solid #fff;
    background: rgba(0, 255, 255, 0.3);
  }
  `;

const TableCell = styled.td`
  padding: 8px;
  border-bottom: 1px solid #ddd;
  letter-spacing: 0.4px;
`;

const ErrorMessage = styled.p`
  color: red;
`;
