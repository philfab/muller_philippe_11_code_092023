import styles from './FeatureItem.module.css';

const FeatureItem = ({ imgSrc, imgAlt, title, children }) => (
  <article className={styles.featureItem}>
    <img src={imgSrc} alt={imgAlt} className={styles.featureIcon} />
    <h3 className={styles.featureItemTitle}>{title}</h3>
    <p>{children}</p>
  </article>
);
  
  export default FeatureItem;