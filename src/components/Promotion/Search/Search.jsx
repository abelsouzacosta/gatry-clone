import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

// componentes
import PromotionList from "../List/List";
import UIInfiniteScroll from "components/UI/InfiniteScroll/InfiniteScroll";

import useApi from "components/utils/useApi";

// estilo
import "./Search.css";

const PromotionSearch = () => {
  const mountRef = useRef(null);
  const [search, setSearch] = useState("");
  const [load, loadInfo] = useApi({
    url: "/promotions",
    method: "get",
    params: {
      _embed: "comments",
      _order: "desc",
      _sort: "id",
      _limit: 2,
      _page: 1,
      title_like: search || undefined,
    },
    debouncedDelay: 300,
  });

  useEffect(() => {
    load({
      debounced: mountRef.current,
    });

    if (!mountRef.current) mountRef.current = true;
    // eslint-disable-next-line
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
      <PromotionList
        promotions={loadInfo.data}
        error={loadInfo.error}
        loading={loadInfo.loading}
      />
      <UIInfiniteScroll />
    </div>
  );
};

export default PromotionSearch;
