import { useRef } from "react";
/**
 * Recebe uma função e um tempo de delay para executar
 * a mesma  de forma com que haja um atraso na execução da função
 * @param {object} fn - função
 * @param {int} delay - tempo
 * @returns handler
 */
export default function useDebouncedPromise(fn, delay = 500) {
  let timeoutRef = useRef(null);

  /**
   * Retorna uma função e transforma a mesma em uma promise
   * passando para ela todos os parâmetros que foram passados para a
   * função
   * @param  {...any} params - parametros da função a ser convertida para promise
   */
  function handler(...params) {
    return new Promise((resolve, reject) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = window.setTimeout(async () => {
        try {
          let response = await fn(...params);

          resolve(response);
        } catch (error) {
          reject(error);
        }
      }, delay);
    });
  }

  return handler;
}
