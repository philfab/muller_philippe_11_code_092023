import styles from "./GreenButton.module.css";

const GreenButton = ({isTransaction = false, isEdit = false, isDisabled = false, content, textUnderline = false , onClick}) => (
  <button
    className={`
      ${styles.greenButton} 
      ${textUnderline ? styles.textUnderline : ""} 
      ${isDisabled ? styles.disabledButton : ""}
      ${isEdit ? styles.editButton : ""}
      ${isTransaction ? styles.transactionButton : ""}
    `} // string interpolation
    disabled={isDisabled}
    onClick={onClick} 
  >
    {content}
  </button>
);

export default GreenButton;
