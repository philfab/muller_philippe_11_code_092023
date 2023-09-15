import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./SignIn.module.css";
import { loginUser } from "../../redux/thunks/loginUser";
import { useNavigate } from "react-router-dom";
import { clearError } from "../../redux/slices/authSlice";
import { getUserProfile } from "../../redux/thunks/getUserProfile";
import { Helmet } from "react-helmet";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // check si e-mail valide
  const validateEmail = (email) => {
    var re = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return re.test(email);
  };

  useEffect(() => {
    setIsEmailValid(validateEmail(username) || username === "");
  }, [username]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/user");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEmailValid) {
      dispatch(loginUser({ username, password }))
        .unwrap() //extrait la valeur de payload ou rejette la requete
        .then(() => dispatch(getUserProfile()))
        .catch((error) => {
          //  gestion erreurs ici
        });
    }
  };

  const clearErrorOnInputChange = () => {
    if (error) {
      dispatch(clearError());
    }
  };

  return (
    <main className={styles.signInContainer}>
      <Helmet>
        <title>Argent Bank Sing-In Page</title>
      </Helmet>
      <section className={styles.signInContent}>
        <i className="fa fa-user-circle"></i>
        <h1>Sign In</h1>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className={styles.inputWrapper}>
            <label htmlFor="username">Username</label>
            <input
              type="email"
              id="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                clearErrorOnInputChange();
              }}
              required
            />
          </div>
          {!isEmailValid && (
            <p className={styles.error}>Please enter a valid email.</p>
          )}
          <div className={styles.inputWrapper}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                clearErrorOnInputChange();
              }}
              required
            />
          </div>
          <div className={styles.inputRemember}>
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button
            className={styles.signInButton}
            type="submit"
            disabled={!username || !password || !isEmailValid}
            // désactivé si l'un des champs est vide ou si l'email n'est pas valide
          >
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
};

export default SignIn;
