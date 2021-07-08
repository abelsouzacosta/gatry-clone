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
      updateRequestInfo: (newInfo) => newInfo,
      ...config,
      ...localConfig,
    };

    if (finalConfig.isFetchMore) {
      setRequestInfo({
        ...initialRequestInfo,
        data: requestInfo.data,
        loading: true,
      });
    } else if (!finalConfig.quietly) {
      setRequestInfo({
        ...initialRequestInfo,
        loading: true,
      });
    }

    const makeRequest = finalConfig.debounced ? debouncedAxios : axios;

    try {
      response = await makeRequest(finalConfig);

      const newRequestInfo = {
        ...initialRequestInfo,
        data: response.data,
      };

      if (response.headers["x-total-count"] !== undefined)
        newRequestInfo.total = Number.parseInt(
          response.headers["x-total-count"],
          10
        );

      setRequestInfo(
        finalConfig.updateRequestInfo(newRequestInfo, requestInfo)
      );
    } catch (error) {
      setRequestInfo(
        finalConfig.updateRequestInfo({
          ...initialRequestInfo,
          error,
        })
      );
    }

    if (config.onCompleted) {
      config.onCompleted(response);
    }

    return response;
  }

  return [call, requestInfo];
}
