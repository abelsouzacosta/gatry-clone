import { useState } from "react";

import axios from "axios";

import useDebouncedPromise from "./useDebouncedPromise";

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
  const debouncedAxios = useDebouncedPromise(axios, config.debouncedDelay);

  async function call(localConfig) {
    setRequestInfo({
      ...initialRequestInfo,
      loading: true,
    });

    let response = null;

    const finalConfig = {
      baseURL: "http://localhost:5000",
      ...config,
      ...localConfig,
    };

    const makeRequest = finalConfig.debounced ? debouncedAxios : axios;

    try {
      response = await makeRequest(finalConfig);
      setRequestInfo({
        ...initialRequestInfo,
        data: response.data,
      });
    } catch (error) {
      setRequestInfo({
        ...initialRequestInfo,
        error,
      });
    }

    if (config.onCompleted) {
      config.onCompleted(response);
    }

    return response;
  }

  return [call, requestInfo];
}
