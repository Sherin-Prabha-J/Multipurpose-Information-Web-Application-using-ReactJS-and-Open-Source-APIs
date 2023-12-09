import React, { useEffect, useState } from "react";
import "../css/news.css";

const News = () => {
  const [country, setCountry] = useState("us");
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getNews();
  });

  const getNews = () => {
    fetch(
      `https://newsapi.org/v2/top-headlines?country=${country}&pageSize=40&page=1&apiKey=e76d5f1eb4574dde9606b84a73e9cd25&imagesOnly=true`
    )
      .then((response) => response.json())
      .then((data) => {
        setArticles([...data.articles]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
    getNews();
  };
  return (
    <div className="news__container">
        <select
          className="country-select"
          value={country}
          onChange={handleCountryChange}
        >
          <option value="us">USA</option>
          <option value="gb">ENGLAND</option>
          <option value="in">INDIA</option>
          <option value="fr">FRANCE</option>
          <option value="de">DENMARK</option>
          <option value="cn">CHINA</option>
          <option value="jp">JAPAN</option>
          <option value="ru">RUSSIA</option>
        </select>
      <div className="news-container">
        {articles.map((article) => (
          <div className="news-article" key={article.title}>
            <h2>{article.title}</h2>
            <img
              className="news-image"
              src={article.urlToImage}
              alt={article.title}
            />
            <p>{article.description}</p>
            <a href={article.url}>Read more</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
