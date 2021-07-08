import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

// componentes
import PromotionList from "../List/List";
import UIInfiniteScroll from "components/UI/InfiniteScroll/InfiniteScroll";

import useApi from "components/utils/useApi";

// estilo
import "./Search.css";

// base params
const baseParams = {
  _embed: "comments",
  _order: "desc",
  _sort: "id",
  _limit: 2,
};

const PromotionSearch = () => {
  const [page, setPage] = useState(1);
  const mountRef = useRef(null);
  const [search, setSearch] = useState("");
  const [load, loadInfo] = useApi({
    url: "/promotions",
    method: "get",
    debouncedDelay: 300,
  });

  useEffect(() => {
    load({
      debounced: mountRef.current,
      params: { ...baseParams, _page: 1, title_like: search || undefined },
    });

    if (!mountRef.current) mountRef.current = true;
    // eslint-disable-next-line
  }, [search]);

  function fetchMore() {
    const newPage = page + 1;

    load({
      isFetchMore: true,
      params: {
        ...baseParams,
        _page: newPage,
        title_like: search || undefined,
      },
      updateRequestInfo: (newRequestInfo, prevRequestInfo) => ({
        ...newRequestInfo,
        data: [...prevRequestInfo.data, newRequestInfo.data],
      }),
    });

    setPage(newPage);
  }

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
      {loadInfo.data && loadInfo.loading && (
        <UIInfiniteScroll fetchMore={fetchMore} />
      )}
    </div>
  );
};

export default PromotionSearch;
