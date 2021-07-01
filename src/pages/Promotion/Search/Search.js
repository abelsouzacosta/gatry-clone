import React, { useEffect, useState } from "react";

// estilos
import "./Search.css";

// componentes
import PromotionCard from "components/Promotion/Card/Card";

import axios from "axios";

const PagesPromotionSearch = () => {
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/promotions?_embed=comments")
      .then((response) => setPromotions(response.data));
  }, []);

  return (
    <div className="main">
      {promotions.length > 0 &&
        promotions.map((promotion) => {
          return <PromotionCard promotionApiResponse={promotion} />;
        })}
    </div>
  );
};

export default PagesPromotionSearch;
