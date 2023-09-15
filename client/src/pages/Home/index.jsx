import styles from "./Home.module.css";
import { Helmet } from "react-helmet";

function Home() {
  return (
    <main className={styles.gridContainer}>
      <Helmet>
        <title>Argent Bank Home Page</title>
      </Helmet>
    </main>
  );
}

export default Home;
