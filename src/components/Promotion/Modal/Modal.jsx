import React, { useEffect, useState } from "react";

import UIModal from "components/UI/Modal/Modal";
import PromotionModalCommentsTree from "./CommentsTree/CommentsTree";

import useApi from "components/utils/useApi";

import "./Modal.css";

const PromotionModal = ({ promotionId, onClickClose }) => {
  const [comment, setComment] = useState("");
  const [load, loadInfo] = useApi({
    url: `/comments`,
    params: {
      promotionId,
      _expand: "user",
    },
  });

  const [sendComment, sendCommentInfo] = useApi({
    url: "/comments",
    method: "post",
  });

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onSubmit(event) {
    event.preventDefault();

    try {
      await sendComment({
        data: {
          userId: 1,
          promotionId,
          comment,
        },
      });
      // limpa o textarea
      setComment("");
      // recarrega a página
      load();
    } catch (error) {}
  }

  return (
    <UIModal isOpen onClickClose={onClickClose}>
      <form className="promotion-modal-comment-form" onSubmit={onSubmit}>
        <textarea
          placeholder="Comentar..."
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
        <button type="submit" disabled={sendComment.loading}>
          {sendComment.loading ? "Enviando..." : "Enviar"}
        </button>
      </form>
      <PromotionModalCommentsTree comments={loadInfo.data} />
    </UIModal>
  );
};

export default PromotionModal;
