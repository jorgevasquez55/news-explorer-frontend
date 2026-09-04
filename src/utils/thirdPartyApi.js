import {
  NEWS_API_BASE_URL,
  NEWS_API_KEY,
  NEWS_LANGUAGE,
  NEWS_PAGE_SIZE,
  NEWS_SEARCH_DAYS_RANGE,
} from "./config";

const MS_PER_DAY = 86400000;

export function getNews(keyword) {
  const dateFrom = new Date(
    Date.now() - NEWS_SEARCH_DAYS_RANGE * MS_PER_DAY
  ).toISOString();
  const dateNow = new Date().toISOString();

  const url = `${NEWS_API_BASE_URL}?q=${encodeURIComponent(
    keyword
  )}&from=${dateFrom}&to=${dateNow}&sortBy=relevancy&language=${NEWS_LANGUAGE}&pageSize=${NEWS_PAGE_SIZE}&apiKey=${NEWS_API_KEY}`;

  return fetch(url).then((res) =>
    res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
  );
}
