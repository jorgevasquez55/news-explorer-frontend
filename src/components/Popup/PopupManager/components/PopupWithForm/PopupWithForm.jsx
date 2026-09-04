import "./PopupWithForm.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { SignIn } from "./components/SignIn/SignIn";
import { SignUp } from "./components/SignUp/SignUp";
import FormValidator from "../../../../../utils/FormValidator";

export function PopupWithForm({ popup, onOpenPopup }) {
  const [errorMsg, setErrorMsg] = useState();
  const [buttonDisabled, setbuttonDisabled] = useState(true);

  const formValidator = useRef();
  const formRef = useRef();

  // Actualiza dinámicamente el estado del mensaje de error según el nombre del input.
  const handleFormErrorState = useCallback(({ name, errorMessage }) => {
    setErrorMsg((prev) => ({
      ...prev,
      [name]: errorMessage,
    }));
  }, []);

  // Habilita/deshabilita el botón según la validación del formulario.
  const handleFormButtonState = useCallback((isDisabled) => {
    setbuttonDisabled(isDisabled);
  }, []);

  useEffect(() => {
    formValidator.current = new FormValidator({
      formElement: formRef.current,
      inputSelector: ".popup__input",
      handleFormErrorState,
      handleFormButtonState,
    });
    formValidator.current.validateForm();
  }, [handleFormErrorState, handleFormButtonState, popup]);

  function handleGoToSignIn() {
    onOpenPopup({ type: "signin" });
    setErrorMsg("");
  }

  function handleGoToSignUp() {
    onOpenPopup({ type: "signup" });
    setErrorMsg("");
  }

  return (
    <>
      <h2 className="popup__title">
        {popup === "signin" && "Iniciar sesión"}
        {popup === "signup" && "Regístrate"}
      </h2>
      {popup === "signin" && (
        <SignIn
          formRef={formRef}
          formValidator={formValidator}
          buttonDisabled={buttonDisabled}
          errorMsg={errorMsg}
          onError={handleFormErrorState}
        />
      )}
      {popup === "signup" && (
        <SignUp
          formRef={formRef}
          formValidator={formValidator}
          buttonDisabled={buttonDisabled}
          errorMsg={errorMsg}
          onError={handleFormErrorState}
        />
      )}
      <p className="popup__goto-text">
        o{" "}
        <button
          onClick={popup !== "signup" ? handleGoToSignUp : handleGoToSignIn}
          type="button"
          className="popup__button popup__button_goto"
        >
          {popup !== "signup" ? "Regístrate" : "Iniciar sesión"}
        </button>
      </p>
    </>
  );
}
