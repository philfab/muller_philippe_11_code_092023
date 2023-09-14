import styles from "./Header.module.css";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import bankLogo from "../../assets/images/argentBankLogo.webp";
import { logout } from "../../redux/slices/authSlice";
import { persistor } from "../../redux/store";

const Header = () => {
  //useSelector permet de récupérer le state du store
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    // Purge le stockage persistant
    persistor.purge();
    navigate("/");
  };

  return (
    <nav className={styles.headerContainer}>
      <NavLink to="/">
        <img src={bankLogo} alt="Argent Bank Logo" />
      </NavLink>
      <div>
        {/* TODO : ajouter les liens pour les différentes pages (SignIn + User*/}
        <NavLink className={styles.navLink} to="/user">
          <i className="fa fa-user-circle"></i>
          {/* '?' = opérateur de chaînage optionnel utile si user est null*/}
          {isAuthenticated ? user?.userName : "Sign In"}{" "}
        </NavLink>
        {isAuthenticated && (
          <NavLink className={styles.navLink} to="/" onClick={handleLogout}>
            <i className="fa-solid fa-right-from-bracket"></i>
            Sign Out
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Header;
