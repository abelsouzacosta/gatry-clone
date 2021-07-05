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
          <li className="promotion-modal-comments-tree__item">
            <img
              src={item.user.avatarUrl}
              alt={`perfil de ${item.user.name}`}
              className="promotion-modal-comments-tree__item__avatar"
            />
            <div className="promotion-modal-comments-tree__item__info">
              <span className="promotion-modal-comments-tree__item__name">
                {item.user.name}
              </span>
              <p>{item.comment}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default PromotionModalCommentsTree;