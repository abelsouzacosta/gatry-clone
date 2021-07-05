import React from "react";

import UIModal from "components/UI/Modal/Modal";

const PromotionModal = ({ promotionId, onClickClose }) => {
  return (
    <UIModal isOpen={Boolean(promotionId)} onClickClose={onClickClose}>
      <h1>Comentários no modal</h1>
    </UIModal>
  );
};

export default PromotionModal;
