import React from "react";

/**
 * recebe um objeto retornado da api e renderiza dentro do card da aplicação
 *
 * o objeto contem imagem, titulo, preço, e um array de comentários
 */
const PromotionCard = ({ promotionApiResponse }) => {
  return (
    <div>
      <img
        src={promotionApiResponse.imageUrl}
        alt={promotionApiResponse.title}
      />
      <div>
        <h1>{promotionApiResponse.title}</h1>
        <span>R$ {promotionApiResponse.price}</span>
        <footer>
          {promotionApiResponse.comments.length > 0 && (
            // verifica se há algum comentário e se houver vai
            // renderizar uma div que mostra o primeiro comentário escrito
            <div>{promotionApiResponse.comments[0].comment}</div>
          )}

          <div>
            {promotionApiResponse.comments.length}{" "}
            {promotionApiResponse.comments.length > 1
              ? "Comentários"
              : "Comentário"}
          </div>
          <a href={promotionApiResponse.url}>IR PARA O SITE</a>
        </footer>
      </div>
    </div>
  );
};

export default PromotionCard;
