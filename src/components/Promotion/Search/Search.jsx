import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// componentes
import PromotionCard from "../Card/Card";

// estilo
import "./Search.css";

const PromotionSearch = () => {
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/promotions?_embed=comments")
      .then((response) => setPromotions(response.data));
  }, []);

  return (
    <div className="promotion-search">
      <header className="promotion-search__header">
        <h1>PROMO SHOW</h1>
        <Link to="/create">Nova promoção</Link>
      </header>
      <input
        type="search"
        name="search"
        id="search"
        className="promotion-search__input"
        placeholder="Buscar..."
      />
      {promotions.length > 0 &&
        promotions.map((promotion) => {
          return (
            <PromotionCard
              key={promotion.id}
              promotionApiResponse={promotion}
            />
          );
        })}
    </div>
  );
};

export default PromotionSearch;
