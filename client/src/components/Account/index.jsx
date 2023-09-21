import GreenButton from "../GreenButton";
import styles from "./Account.module.css";

function Account({ title, amount, description }) {
  return (
    <section className={styles.accountContainer}>
      <div className={styles.accountWrapper}>
        <h3 className={styles.accountTitle}>{title}</h3>
        <p className={styles.accountAmount}>{amount}</p>
        <p className={styles.accountDescription}>{description}</p>
      </div>

      <GreenButton isTransaction content="View transactions" />
    </section>
  );
}

export default Account;
