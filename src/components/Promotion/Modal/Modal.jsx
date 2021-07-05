import React from "react";

import UIModal from "components/UI/Modal/Modal";

const PromotionModal = ({ promotionId, setPromotionId }) => {
  return (
    <UIModal
      isOpen={Boolean(promotionId)}
      onClickClose={() => setPromotionId(null)}
    >
      <h1>Comentários no modal</h1>
    </UIModal>
  );
};

export default PromotionModal;
