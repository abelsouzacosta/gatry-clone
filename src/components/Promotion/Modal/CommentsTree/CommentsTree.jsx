import React, { useState } from "react";

import "./CommentsTree.css";

const PromotionModalCommentsTree = ({ comments, sendComment }) => {
  const [comment, setComment] = useState("");
  const [activeCommentBox, setActiveCommentBox] = useState(null);
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
              <button
                type="button"
                className="promotion-modal-comments-tree__answer-button"
                onClick={(event) => {
                  setActiveCommentBox(
                    activeCommentBox === item.id ? null : item.id
                  );
                  setComment("");
                }}
              >
                Reponder
              </button>
              {activeCommentBox === item.id && (
                <div className="promotion-modal-comments-tree__comment-box">
                  <textarea
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                  />
                  <button
                    type="button"
                    className="promotion-modal-comments-tree__send-button"
                    onClick={() => {
                      sendComment(comment, item.id);
                      setComment("");
                      setActiveCommentBox(null);
                    }}
                  >
                    Enviar
                  </button>
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

PromotionModalCommentsTree.defaultProps = {
  sendComment: (comment, parentId) => {
    console.log({ comment, parentId });
  },
};

export default PromotionModalCommentsTree;
