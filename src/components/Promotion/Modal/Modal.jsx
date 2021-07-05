import React, { useEffect } from "react";

import UIModal from "components/UI/Modal/Modal";
import PromotionModalCommentsTree from "./CommentsTree/CommentsTree";

import useApi from "components/utils/useApi";

const PromotionModal = ({ promotionId, onClickClose }) => {
  const [load, loadInfo] = useApi({
    url: `/comments`,
    params: {
      promotionId,
      _expand: "user",
    },
  });

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UIModal isOpen onClickClose={onClickClose}>
      <PromotionModalCommentsTree comments={loadInfo.data} />
    </UIModal>
  );
};

export default PromotionModal;
