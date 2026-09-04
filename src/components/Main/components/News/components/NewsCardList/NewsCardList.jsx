import "./NewsCardList.css";
import { NewsCard } from "./components/NewsCard/NewsCard";
import notFound from "../../../../../../images/not-found_v1.svg";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CurrentUserContext } from "../../../../../../contexts/CurrentUserContext";

export function NewsCardList({ newsData }) {
  const [cardsLimit, setCardsLimit] = useState(3);

  const { articles, keyword } = newsData;

  const { savedNews } = useContext(CurrentUserContext);

  const location = useLocation();
  const isOnSavedNews = location.pathname === "/saved-news";

  function handleClickButton() {
    setCardsLimit(cardsLimit + 3);
  }

  useEffect(() => {
    if (isOnSavedNews) {
      setCardsLimit(isOnSavedNews.length);
    }
  }, [isOnSavedNews]);

  if (!articles && !isOnSavedNews) {
    return (
      <>
        <img className="news__not-found-image" src={notFound} alt="" />
        <h2 className="news__not-found-title">Ocurrió un error</h2>
        <p className="news__not-found-content">
          Lo sentimos, algo salió mal durante la solicitud. Puede haber un
          problema de conexión o el servidor puede estar inactivo. Por favor,
          inténtalo de nuevo más tarde.
        </p>
      </>
    );
  }

  if (
    (!isOnSavedNews && articles?.length === 0) ||
    (isOnSavedNews && savedNews?.length === 0)
  ) {
    return (
      <>
        <img className="news__not-found-image" src={notFound} alt="" />
        <h2 className="news__not-found-title">
          {!isOnSavedNews ? "No se ha encontrado nada" : "No hay artículos guardados"}
        </h2>
        <p className="news__not-found-content">
          {!isOnSavedNews
            ? "Lo sentimos, pero nada coincide con tus términos de búsqueda."
            : "No se encontraron artículos guardados. Guarda artículos para que aparezcan aquí."}
        </p>
      </>
    );
  }

  return (
    <>
      {!isOnSavedNews && (
        <h2 className="news__title">{`Resultados de búsqueda para "${keyword}"`}</h2>
      )}
      <ul className="news__card-list">
        {(!isOnSavedNews ? articles : savedNews)
          .slice(0, cardsLimit)
          .map((news) => {
            return (
              <NewsCard
                key={news.url}
                article={news}
                keyword={!isOnSavedNews ? keyword : news.keyword}
                isOnSavedNews={isOnSavedNews}
              />
            );
          })}
      </ul>
      {cardsLimit < articles?.length && (
        <button
          onClick={handleClickButton}
          type="button"
          className="news__button"
        >
          Mostrar más
        </button>
      )}
    </>
  );
}
