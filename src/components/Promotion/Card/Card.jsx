import React from "react";

import "./Card.css";

import { Link } from "react-router-dom";

/**
 * recebe um objeto retornado da api e renderiza dentro do card da aplicação
 *
 * o objeto contem imagem, titulo, preço, e um array de comentários
 */
const PromotionCard = ({ promotion, onClickComments }) => {
  return (
    <div className="promotion-card">
      <img
        className="promotion-card__image"
        src={promotion.imageUrl}
        alt={promotion.title}
      />
      <div className="promotion-card__info">
        <h1 className="promotion-card__title">{promotion.title}</h1>
        <span className="promotion-card__price">R$ {promotion.price}</span>
        <footer className="promotion-card__footer">
          {promotion.comments.length > 0 && (
            // verifica se há algum comentário e se houver vai
            // renderizar uma div que mostra o primeiro comentário escrito
            <div className="promotion-card__comment">
              "{promotion.comments[0].comment}"
            </div>
          )}

          <button
            className="promotion-card__comments-count"
            onClick={onClickComments}
          >
            {promotion.comments.length}{" "}
            {promotion.comments.length > 1 ? "Comentários" : "Comentário"}
          </button>
          <a
            href={promotion.url}
            target="_blank"
            rel="noreferrer"
            className="promotion-card__link"
          >
            IR PARA O SITE
          </a>
          <Link to={`/edit/${promotion.id}`}>Editar</Link>
        </footer>
      </div>
    </div>
  );
};

export default PromotionCard;
