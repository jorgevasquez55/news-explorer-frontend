import "./PopupConfirmation.css";
import { useState } from "react";

export function PopupConfirmation({ article, onRemoveArticle }) {
  const [isProcessing, setIsProcessing] = useState(false);

  function handleButtonClick() {
    setIsProcessing(true);
    onRemoveArticle(article).finally(() => {
      setIsProcessing(false);
    });
  }
  return (
    <>
      <h2 className="popup__title popup__title_confirmation">
        ¿Estás seguro de que quieres eliminar el artículo guardado?
      </h2>
      <button
        onClick={handleButtonClick}
        type="button"
        className={`popup__button popup__button_submit ${
          isProcessing ? " popup__submit_processing" : ""
        }`}
        disabled={isProcessing}
      >
        {!isProcessing ? (
          "Confirmar"
        ) : (
          <>
            Eliminando... <span className="popup__spinner"></span>
          </>
        )}
      </button>
    </>
  );
}
