import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// componentes
import PromotionList from "../List/List";

// estilo
import "./Search.css";

const PromotionSearch = () => {
  const [promotions, setPromotions] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const params = {};

    // determina que o parametro 'title' é igual
    // a busca
    if (search) {
      params.title_like = search;
    }

    // se houver busca ele vai buscar o que está escrito no titulo
    // axios recebe a url e um objeto de configuração
    axios
      .get("http://localhost:5000/promotions?_embed=comments", { params })
      .then((response) => setPromotions(response.data));
  }, [search]);

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
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <PromotionList promotions={promotions} loading={!promotions.length > 0} />
    </div>
  );
};

export default PromotionSearch;
