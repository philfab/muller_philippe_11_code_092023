import styles from "./Home.module.css";
import FeatureItem from '../../components/FeatureItem';
import chatIcon from '../../assets/images/icon-chat.webp';
import moneyIcon from '../../assets/images/icon-money.webp';
import securityIcon from '../../assets/images/icon-security.webp';
import backgroundImage from '../../assets/images/bank-tree.webp';

const Home = () => (
  <main>
  
    <section style={{ backgroundImage: `url(${backgroundImage})` }} className={styles.hero}>
      <div className={styles.heroContent}>
        <h2 className={styles.srOnly}>Promoted Content</h2>
        <p className={styles.subtitle}>No fees.</p>
        <p className={styles.subtitle}>No minimum deposit.</p>
        <p className={styles.subtitle}>High interest rates.</p>
        <p className={styles.text}>Open a savings account with Argent Bank today!</p>
      </div>
    </section>

    <section className={styles.features}>
      <h2 className={styles.srOnly}>Features</h2>

      <FeatureItem imgSrc={chatIcon} imgAlt="Chat Icon" title="You are our #1 priority">
        Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.
      </FeatureItem>

      <FeatureItem imgSrc={moneyIcon}  imgAlt="Money Icon" title="More savings means higher rates">
        The more you save with us, the higher your interest rate will be!
      </FeatureItem>

      <FeatureItem imgSrc={securityIcon}  imgAlt="Security Icon" title="Security you can trust">
        We use top of the line encryption to make sure your data and money is always safe.
      </FeatureItem>
    </section>
  </main>
);

export default Home;
