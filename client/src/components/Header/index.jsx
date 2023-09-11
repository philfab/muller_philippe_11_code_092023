import styles from "./Header.module.css";
import { useSelector } from "react-redux";

const Header = () => {
  //useSelector permet de récupérer le state du store
  const user = useSelector((state) => state.auth.user);

  return <header className={styles.headerContainer}></header>;
};

export default Header;
