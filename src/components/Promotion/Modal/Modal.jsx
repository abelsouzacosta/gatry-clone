import React, { useEffect } from "react";

import UIModal from "components/UI/Modal/Modal";

import useApi from "components/utils/useApi";

const PromotionModal = ({ promotionId, onClickClose }) => {
  const [load, loadInfo] = useApi({
    url: `/comments`,
    params: {
      promotionId,
    },
  });

  useEffect(() => {
    load();
    console.log(loadInfo);
  }, []);

  return (
    <UIModal isOpen={Boolean(promotionId)} onClickClose={onClickClose}>
      <h1>Comentários no modal</h1>
    </UIModal>
  );
};

export default PromotionModal;
