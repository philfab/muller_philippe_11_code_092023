import styles from "./Header.module.css";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import bankLogo from "../../assets/images/argentBankLogo.webp";

const Header = () => {
  //useSelector permet de récupérer le state du store
  const { isAuthenticated, user } = useSelector((state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
  }));

  return (
    <nav className={styles.headerContainer}>
      <NavLink to="/">
        <img src={bankLogo} alt="Argent Bank Logo" />
      </NavLink>
      <div>
        {/* TODO : ajouter les liens pour les différentes pages (SignIn + User*/}
        <NavLink className={styles.navLink} to="/signIn">
          <i className="fa fa-user-circle"></i>
          {/* '?' = opérateur de chaînage optionnel utile si user est null*/}
          {isAuthenticated ? user?.username : "Sign In"}{" "}
        </NavLink>
        {isAuthenticated && (
          <NavLink className={styles.navLink} to="/">
            <i className="fa-solid fa-right-from-bracket"></i>
            Sign Out
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Header;
