import React from "react";

import "./Card.css";

/**
 * recebe um objeto retornado da api e renderiza dentro do card da aplicação
 *
 * o objeto contem imagem, titulo, preço, e um array de comentários
 */
const PromotionCard = ({ promotionApiResponse }) => {
  return (
    <div className="promotion-card">
      <img
        className="promotion-card__image"
        src={promotionApiResponse.imageUrl}
        alt={promotionApiResponse.title}
      />
      <div className="promotion-card__info">
        <h1 className="promotion-card__title">{promotionApiResponse.title}</h1>
        <span className="promotion-card__price">
          R$ {promotionApiResponse.price}
        </span>
        <footer className="promotion-card__footer">
          {promotionApiResponse.comments.length > 0 && (
            // verifica se há algum comentário e se houver vai
            // renderizar uma div que mostra o primeiro comentário escrito
            <div className="promotion-card__comment">
              "{promotionApiResponse.comments[0].comment}"
            </div>
          )}

          <div className="promotion-card__comments-count">
            {promotionApiResponse.comments.length}{" "}
            {promotionApiResponse.comments.length > 1
              ? "Comentários"
              : "Comentário"}
          </div>
          <a
            href={promotionApiResponse.url}
            target="_blank"
            rel="noreferrer"
            className="promotion-card__link"
          >
            IR PARA O SITE
          </a>
        </footer>
      </div>
    </div>
  );
};

export default PromotionCard;
