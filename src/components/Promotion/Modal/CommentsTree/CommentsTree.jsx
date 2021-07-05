import React from "react";

import "./CommentsTree.css";

const PromotionModalCommentsTree = ({ comments }) => {
  if (!comments) return <div>Carregando...</div>;

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
