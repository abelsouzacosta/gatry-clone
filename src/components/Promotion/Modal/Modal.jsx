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

  const [sendComment] = useApi({
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

  async function sendAnswer(reply, parentId) {
    await sendComment({
      data: {
        userId: 1,
        promotionId,
        comment: reply,
        parentId,
      },
    });
    load();
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
      {/** setting key as 1 is completly hacky and is a bad practice - refactor */}
      <PromotionModalCommentsTree
        key="1"
        comments={loadInfo.data}
        sendComment={sendAnswer}
      />
    </UIModal>
  );
};

export default PromotionModal;
