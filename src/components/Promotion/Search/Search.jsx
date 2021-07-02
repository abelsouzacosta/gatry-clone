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
  const [load, loadInfo] = useApi({
    url: "http://localhost:5000/promotions",
    params: {
      _embed: "comments",
      _order: "desc",
      _sort: "id",
      title_like: search || undefined,
    },
    onCompleted: (response) => {
      setPromotions(response.data);
    },
  });

  useEffect(() => {
    load();
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
