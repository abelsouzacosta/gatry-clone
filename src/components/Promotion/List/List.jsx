import React from "react";
import PromotionCard from "../Card/Card";

// estilos
import "./List.css";

const PromotionList = ({ loading, promotions }) => {
  if (loading) return <div>Carregando...</div>;

  return (
    <div className="promotion-list">
      {promotions.map((promotion) => {
        return <PromotionCard key={promotion.id} promotion={promotion} />;
      })}
    </div>
  );
};

export default PromotionList;
