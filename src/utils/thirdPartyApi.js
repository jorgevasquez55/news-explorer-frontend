import { MAIN_API_BASE_URL } from "./config";

// La búsqueda de noticias pasa por nuestro propio backend, que actúa como
// proxy hacia NewsAPI. Esto evita la restricción del plan gratuito de
// NewsAPI, que solo permite llamadas directas desde localhost.
export function getNews(keyword) {
  return fetch(
    `${MAIN_API_BASE_URL}/news?q=${encodeURIComponent(keyword)}`
  ).then((res) =>
    res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
  );
}
