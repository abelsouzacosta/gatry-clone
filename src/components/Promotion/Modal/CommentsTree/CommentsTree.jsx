import React, { useState } from "react";

import "./CommentsTree.css";

/**
 * Receives a comment flat list
 *
 * Split the elements received in two distinct categories
 * The first category are the elements that does not have a parentId
 * these elements will be the root of the tree
 *
 * And the second are the elements that have a parentId
 * @param {array} list - comment list
 */
function getTree(list) {
  if (!list) {
    return [];
  }
  const roots = [];
  const childrenByParentId = {};

  list.forEach((item) => {
    if (!item.parentId) {
      roots.push(item);
      return;
    }
    if (!childrenByParentId[item.parentId]) {
      childrenByParentId[item.parentId] = [];
    }
    childrenByParentId[item.parentId].push(item);
  });

  function buildNodes(nodes) {
    if (!nodes) {
      return null;
    }
    return nodes.map((node) => ({
      ...node,
      children: buildNodes(childrenByParentId[node.id]),
    }));
  }

  return buildNodes(roots);
}

const PromotionModalCommentsTree = ({ comments, sendComment }) => {
  console.log(getTree(comments));
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
  sendComment: () => {},
};

export default PromotionModalCommentsTree;
