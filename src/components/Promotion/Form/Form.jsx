import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import useApi from "components/utils/useApi";

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
  // usado para carregar informação na tela
  const [load] = useApi({
    url: `/promotions/${id}`,
    method: "get",
    onCompleted: (response) => {
      setValues(response.data);
    },
  });
  // usado para fazer o submit do formulário
  const [save, saveInfo] = useApi({
    url: id ? `promotions/${id}` : "promotions/",
    method: id ? "put" : "post",
    onCompleted: (response) => {
      if (!response.error) history.push("/");
    },
  });

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
    event.preventDefault();
    save({
      data: values,
    });
  }

  /**
   * se houver um id vai buscar pela promoção dentro do banco de dados
   */
  useEffect(() => {
    if (id) load();

    // eslint-disable-next-line
  }, [id]);

  return (
    <div>
      <h1>PROMO SHOW</h1>
      <p>Nova promoção</p>

      <form onSubmit={onSubmit}>
        {saveInfo.loading && <div>Salvando dados</div>}
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
