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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UIModal isOpen onClickClose={onClickClose}>
      <h1>Comentários no modal</h1>
    </UIModal>
  );
};

export default PromotionModal;
