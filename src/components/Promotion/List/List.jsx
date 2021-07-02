import React from "react";
import PromotionCard from "../Card/Card";

// estilos
import "./List.css";

const PromotionList = ({ loading, promotions }) => {
  if (loading || !promotions) return <div>Carregando...</div>;

  if (promotions.length === 0) return <div>Nenhum resultado encontrado</div>;

  return (
    <div className="promotion-list">
      {promotions.map((promotion) => {
        return <PromotionCard key={promotion.id} promotion={promotion} />;
      })}
    </div>
  );
};

export default PromotionList;
