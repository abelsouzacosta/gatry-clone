import React, { useEffect, useState } from "react";
import axios from "axios";

// componentes
import PromotionCard from "../Card/Card";

const PromotionSearch = () => {
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/promotions?_embed=comments")
      .then((response) => setPromotions(response.data));
  }, []);

  return (
    <div>
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
