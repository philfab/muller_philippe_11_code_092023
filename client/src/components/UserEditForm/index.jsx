import { useState } from "react";
import GreenButton from "../GreenButton";
import styles from "./UserEdit.module.css";

const UserEditForm = ({
  firstName,
  lastName,
  onCancel,
  onSave,
  userName,
  setUserName,
}) => {

  const isValidUserName = (name) => {
    const alphanumeric = /^[a-z0-9_]+$/i;
    return name.length >= 4 && alphanumeric.test(name);
  };

  const [isValid, setIsValid] = useState(isValidUserName(userName));

  const handleUserNameChange = (e) => {
    const value = e.target.value;
    setUserName(value);
    setIsValid(isValidUserName(value));
  };

  return (
    <section className={styles.containerUser}>
      <h1>Edit user info</h1>
      <div>
        <label>User Name : </label>
        <input value={userName} onChange={handleUserNameChange} />
      </div>
      <div>
        <label>First Name : </label>
        <input value={firstName} disabled />
      </div>
      <div>
        <label>Last Name : </label>
        <input value={lastName} disabled />
      </div>
      <div className={styles.containerButtons}>
        <GreenButton isEdit isDisabled={!isValid} content="Save" onClick={onSave}/>
        <GreenButton isEdit content="Cancel" onClick={onCancel}/>
      </div>
    </section>
  );
};


export default UserEditForm;
