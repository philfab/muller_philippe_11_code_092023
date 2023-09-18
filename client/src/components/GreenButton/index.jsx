import styles from "./GreenButton.module.css";

const GreenButton = ({ isDisabled = false, content, textUnderline = false }) => (
  <button
    className={`
      ${styles.greenButton} 
      ${textUnderline ? styles.textUnderline : ""} 
      ${isDisabled ? styles.disabledButton : ""}
    `} // string interpolation
    disabled={isDisabled}
  >
    {content}
  </button>
);

export default GreenButton;
