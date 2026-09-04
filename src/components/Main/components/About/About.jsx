import "./About.css";
import photo from "../../../../images/profile.jpg";

export function About() {
  return (
    <section className="about">
      <img src={photo} alt="" className="about__author-photo" />
      <div className="about__content">
        <h2 className="about__title">Sobre el autor</h2>
        <p className="about__description">
          {/* TODO: reemplaza este texto con tu propia presentación. */}
          Soy Jorge, técnico electromecánico venezolano radicado en Santiago
          de Chile. Actualmente estoy cursando el bootcamp de desarrollo web
          de TripleTen, trabajando con HTML, CSS, metodología BEM,
          JavaScript, React y consumo de APIs REST en el frontend; y con
          Node.js, Express, MongoDB y Mongoose en el backend. También uso
          Git y GitHub para el control de versiones.
        </p>
        <p className="about__description">
          Este proyecto fue clave para consolidar lo aprendido durante el
          curso y profundizar en la estructura del código y la experiencia
          de usuario.
        </p>
      </div>
    </section>
  );
}
