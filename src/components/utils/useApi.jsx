import { useState } from "react";

import axios from "axios";

/**
 * valores iniciais do request
 *
 * Esses valores foram isolados para se no caso de
 * se usar o hook para fazer mais de uma requisição ao mesmo
 * tempo teriamos um requestInfo com inforamções erradas, onde ao
 * mesmo tempo que há erro, há também informações
 *
 * Dessa forma podemos atualizar o estado com base no
 * objeto inicial
 */
const initialRequestInfo = {
  error: null,
  data: null,
  loading: false,
};

/**
 * recebe um objeto de confirguração e retorna o que
 * é a resposta da api
 * @param {Object} config - objeto de configuração do axios
 * @returns
 */
export default function useApi(config) {
  const [requestInfo, setRequestInfo] = useState(initialRequestInfo);

  async function call(localConfig) {
    setRequestInfo({
      ...initialRequestInfo,
      loading: true,
    });

    let response = null;

    try {
      response = await axios({
        baseURL: "http://localhost:5000",
        ...config,
        ...localConfig,
      });

      setRequestInfo({
        ...initialRequestInfo,
        data: response.data,
      });
    } catch (error) {
      setRequestInfo({
        ...initialRequestInfo,
      });
    }

    if (config.onCompleted) {
      config.onCompleted(response);
    }
  }

  return [call, requestInfo];
}
