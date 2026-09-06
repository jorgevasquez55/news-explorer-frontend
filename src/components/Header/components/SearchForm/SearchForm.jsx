import "./SearchForm.css";
import { useRef, useState } from "react";

export function SearchForm({ onSearchRequest }) {
  const [inputValue, setInputValue] = useState("");

  const inputRef = useRef();

  function handleInputChange(evt) {
    setInputValue(evt.target.value);
  }

  function handleSearchSubmit(evt) {
    evt.preventDefault();
    onSearchRequest(inputValue.trim());
    setInputValue("");
    inputRef.current.blur();
  }

  return (
    <section className="search">
      <h2 className="search__title">¿Qué está pasando en el mundo?</h2>
      <p className="search__description">
        Encuentra las últimas noticias sobre cualquier tema y guárdalas en tu
        cuenta personal
      </p>
      <form
        onSubmit={handleSearchSubmit}
        name="search"
        className="search__form"
      >
        <fieldset className="search__fieldset">
          <label className="search__form-field">
            <input
              ref={inputRef}
              name="search"
              id="search"
              onChange={handleInputChange}
              type="text"
              className="search__input"
              placeholder="Ingresa un tema"
              value={inputValue}
              spellCheck={false}
              required
            />
          </label>
          <button type="submit" className="search__form-button">
            Buscar
          </button>
        </fieldset>
      </form>
    </section>
  );
}
