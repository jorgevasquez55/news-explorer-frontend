import { CurrentUserContext } from "../../../../contexts/CurrentUserContext";
import "./SavedNewsHeader.css";
import { useContext, useMemo } from "react";

export function SavedNewsHeader() {
  const { userData, savedNews } = useContext(CurrentUserContext);

  const savedKeywords = useMemo(() => {
    const keywords = savedNews.map(
      (news) => news.keyword.slice(0, 1).toUpperCase() + news.keyword.slice(1)
    );
    const keywordsByCount = keywords.reduce((acc, keyword) => {
      acc[keyword] = (acc[keyword] || 0) + 1;
      return acc;
    }, {});
    return Array.from(new Set(keywords)).sort(
      (a, b) => keywordsByCount[b] - keywordsByCount[a]
    );
  }, [savedNews]);

  const totalKeywords = savedKeywords.length;

  return (
    <section className="saved-news-header">
      <p className="saved-news-header__text">Artículos guardados</p>

      <h2 className="saved-news-header__title">{`${
        userData.username
      }, tienes ${savedNews.length} ${
        savedNews.length === 1 ? "artículo guardado" : "artículos guardados"
      }`}</h2>

      <p className="saved-news-header__keywords">
        {totalKeywords > 0 &&
          `Por palabras clave: ${
            totalKeywords > 3
              ? savedKeywords.slice(0, 2).join(", ")
              : savedKeywords.slice(0, 3).join(", ")
          } ${totalKeywords > 3 ? ` y otras ${totalKeywords - 2}` : ""}`}

        {totalKeywords === 0 &&
          "Guarda artículos para ver aquí las palabras clave."}
      </p>
    </section>
  );
}
