import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/navbar.css";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const Navbar = () => {
  const [navbarActive, setNavbarActive] = useState(false);
  const [activeNews, setActiveNews] = useState(false); 
  const [country, setCountry] = useState("us");

  const toggleNavbarVisibility = (e) => {
    e.preventDefault();
    setNavbarActive(!navbarActive);
  };

  const extendNews = (e) => {
    e.preventDefault();
    console.log("hello")
    setActiveNews(!activeNews);
  }

  const toggleCountry = (e) => {
    e.preventDefault();
    setCountry(e.target.innerHTML);
    setNavbarActive(false);
    console.log(country)
  }

  return (
    <div className="navbar__container">
      <div className="logo">MIWA</div>
      <ul className="desktop__navbar">
        <li>
          <Link to="/crypto">Crypto</Link>
        </li>
        <li>
          <Link to="/">News</Link>
        </li>
        <li>
          <Link to="/exchange">Exchange</Link>
        </li>
        <li>
          <Link to="/stock">Stocks</Link>
        </li>
      </ul>
      <IconButton className="navbar__button" onClick={toggleNavbarVisibility}>
        <MenuIcon />
      </IconButton>
      <div className={`mobile__navbar ${navbarActive ? "active" : ""}`}>
        <ul>
          <Link to="/crypto">
            <li>Crypto</li>
          </Link>
          <li onClick={extendNews}>News</li>
          <ul className={`country ${activeNews ? "extend" : ""}`}>
            <li onClick={toggleCountry}>us</li>
            <li onClick={toggleCountry}>us</li>
            <li onClick={toggleCountry}>us</li>
            <li onClick={toggleCountry}>us</li>
          </ul>
          <Link to="/exchange">
            <li>Exchange</li>
          </Link>
          <Link to="/stock">
            <li>Stocks</li>
          </Link>
        </ul>
        <IconButton className="close__button" onClick={toggleNavbarVisibility}>
          <CloseIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Navbar;
