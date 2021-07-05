import React from "react";

import "./CommentsTree.css";

const PromotionModalCommentsTree = ({ comments }) => {
  if (!comments) return <div>Carregando...</div>;

  if (comments.length === 0)
    return <div>Nenhum comentário foi encontrado para essa promoção</div>;

  return (
    <ul className="promotion-modal-comments-tree">
      {comments.map((item) => {
        return (
          <li>
            <p>{item.comment}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default PromotionModalCommentsTree;
