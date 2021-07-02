import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

// axios
import axios from "axios";

import "./Form.css";

// valoes iniciais do formulário
const initialFormValues = {
  title: "",
  url: "",
  imageUrl: "",
  price: 0,
};

const PromotionForm = ({ id }) => {
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

    // determina o método que vai ser utilizado na requisição
    // post -> inserção
    // put -> alteração
    // id ? alteração : inserção
    const method = id ? "put" : "post";

    // a palavra method determina o que vai ser utilizado
    // data recebe values
    axios[method](
      `http://localhost:5000/promotions${id ? `/${id}` : ``}`,
      values
    ).then((response) => {
      history.push("/");
    });
  }

  /**
   * se houver um id vai buscar pela promoção dentro do banco de dados
   */
  useEffect(() => {
    if (id)
      axios.get(`http://localhost:5000/promotions/${id}`).then((response) => {
        setValues(response.data);
      });
  }, [id]);

  return (
    <div>
      <h1>PROMO SHOW</h1>
      <p>Nova promoção</p>

      <form onSubmit={onSubmit}>
        <div className="promotion-form__group">
          <label htmlFor="title">Título</label>
          <input
            type="text"
            name="title"
            id="title"
            value={values.title}
            onChange={onChange}
          />
        </div>

        <div className="promotion-form__group">
          <label htmlFor="url">Link</label>
          <input
            type="text"
            name="url"
            id="url"
            value={values.url}
            onChange={onChange}
          />
        </div>

        <div className="promotion-form__group">
          <label htmlFor="imageUrl">Imagem (URL)</label>
          <input
            type="text"
            name="imageUrl"
            id="imageUrl"
            value={values.imageUrl}
            onChange={onChange}
          />
        </div>

        <div className="promotion-form__group">
          <label htmlFor="price">Preço</label>
          <input
            type="text"
            name="price"
            id="price"
            value={values.price}
            onChange={onChange}
          />
        </div>

        <div>
          <button type="submit">Salvar</button>
        </div>
      </form>
    </div>
  );
};

export default PromotionForm;
