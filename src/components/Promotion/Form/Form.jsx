import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// axios
import axios from "axios";

import "./Form.css";
import { useEffect } from "react/cjs/react.production.min";

// valoes iniciais do formulário
const initialFormValues = {
  title: "",
  url: "",
  imageUrl: "",
  price: 0,
};

const PromotionForm = (id) => {
  // inicia um estado com o objeto inicial
  const [values, setValues] = useState(initialFormValues);
  const history = useHistory();

  /**
   * função a ser chamada para a atualização do valor do estado
   * do formulário de forma com que eles alterados
   */
  function onChange(event) {
    const { name, value } = event.target;

    // cria um novo objeto a partir do anterior
    // modifica somente a propriedade desejada
    setValues({
      ...values,
      [name]: value,
    });
  }

  function onSubmit(event) {
    // não faz o submit através de 'get'
    // deve ser feito por post
    // de maneira que os valores não são enviados
    // pela url
    event.preventDefault();
    // data recebe values
    axios.post("http://localhost:5000/promotions", values).then((response) => {
      history.push("/");
    });
  }

  return (
    <div>
      <h1>PROMO SHOW</h1>
      <p>Nova promoção</p>

      <form onSubmit={onSubmit}>
        <div className="promotion-form__group">
          <label htmlFor="title">Título</label>
          <input type="text" name="title" id="title" onChange={onChange} />
        </div>

        <div className="promotion-form__group">
          <label htmlFor="url">Link</label>
          <input type="text" name="url" id="url" onChange={onChange} />
        </div>

        <div className="promotion-form__group">
          <label htmlFor="imageUrl">Imagem (URL)</label>
          <input
            type="text"
            name="imageUrl"
            id="imageUrl"
            onChange={onChange}
          />
        </div>

        <div className="promotion-form__group">
          <label htmlFor="price">Preço</label>
          <input type="text" name="price" id="price" onChange={onChange} />
        </div>

        <div>
          <button type="submit">Salvar</button>
        </div>
      </form>
    </div>
  );
};

export default PromotionForm;
