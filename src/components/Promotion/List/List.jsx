import React, { useState } from "react";
import PromotionCard from "../Card/Card";

import PromotionModal from "../Modal/Modal";

// estilos
import "./List.css";

const PromotionList = ({ loading, error, promotions }) => {
  // pega o id da promoção
  // o modal da promoção só vai abrir se o valor de id estiver definido
  const [promotionId, setPromotionId] = useState(null);

  if (loading || !promotions) return <div>Carregando...</div>;

  if (promotions.length === 0) return <div>Nenhum resultado encontrado</div>;

  if (error)
    return (
      <div>
        Houve um erro na requisição, por favor tente novamente mais tarde
      </div>
    );

  return (
    <div className="promotion-list">
      {promotions.map((promotion) => {
        return (
          <PromotionCard
            key={promotion.id}
            promotion={promotion}
            onClickComments={() => setPromotionId(promotion.id)}
          />
        );
      })}
      {promotionId && (
        <PromotionModal
          promotionId={promotionId}
          onClickClose={() => setPromotionId(null)}
        />
      )}
    </div>
  );
};

export default PromotionList;
