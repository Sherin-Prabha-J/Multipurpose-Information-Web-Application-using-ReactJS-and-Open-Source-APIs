import "./App.css";
import News from "./Components/News";
import Stock from "./Components/Stocks";
import Crypto from "./Components/Crypto";
import Exchange from "./Components/Exchange";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./Components/Navbar";

function App() {
  return (
    <Router>
      <div className="home__container">
        <div className="home__content">
          <Routes>
            <Route path="/" exact element={<News />} />
            <Route path='/stock' element={<Stock />} />
            <Route path='/crypto' element={<Crypto />} /> 
            <Route path='/exchange' element={<Exchange />} /> 
          </Routes>
        </div>
        <Navbar className="navbar"/>
      </div>
    </Router>
  );
}

export default App;
