import React from "react";

import "./Form.css";

const PromotionForm = () => {
  return (
    <div>
      <h1>PROMO SHOW</h1>
      <p>Nova promoção</p>

      <form action="">
        <div className="promotion-form__group">
          <label htmlFor="title">Título</label>
          <input type="text" name="title" id="title" />
        </div>

        <div className="promotion-form__group">
          <label htmlFor="link">Link</label>
          <input type="text" name="link" id="link" />
        </div>

        <div className="promotion-form__group">
          <label htmlFor="imageUrl">Imagem (URL)</label>
          <input type="text" name="imageUrl" id="imageUrl" />
        </div>

        <div className="promotion-form__group">
          <label htmlFor="price">Preço</label>
          <input type="text" name="price" id="price" />
        </div>

        <div>
          <button type="submit">Salvar</button>
        </div>
      </form>
    </div>
  );
};

export default PromotionForm;
