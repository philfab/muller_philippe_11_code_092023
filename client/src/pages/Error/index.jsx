import styles from "./Error.module.css";
import { NavLink , useLocation} from "react-router-dom";

function Error() {
  const location = useLocation(); //hook qui permet d' accéder à l'état de la navigation.

  // '?.' évite une erreur si state est undefined
  const errorMessage =
    location.state?.errorMessage || //  "||"  assigne une valeur par défaut à errorMessage
    "Oups ! La page que vous demandez n'existe pas.";

  return (
    <section className={styles.error}>
      <h1>404</h1>
      <p>{errorMessage}</p>
      <NavLink to="/" className={styles.activeLink}>
        Retourner sur la page d’accueil
      </NavLink>
    </section>
  );
}

export default Error;
