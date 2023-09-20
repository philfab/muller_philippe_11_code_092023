import UserEditForm from "../UserEditForm";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserName } from "../../redux/thunks/updateUserName";
import GreenButton from "../GreenButton";
import styles from "./UserHeader.module.css";

const UserHeader = () => {
  const [isEditing, setIsEditing] = useState(false);
  const auth = useSelector((state) => state.auth);
  const { firstName, lastName, userName: initialUserName } = auth.user || {};
  const [currentUserName, setUserName] = useState(initialUserName || "");
  const dispatch = useDispatch();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setUserName(initialUserName);
    setIsEditing(false);
  };

  const handleSave = () => {
    dispatch(updateUserName(currentUserName));
    setIsEditing(false);
  };

  useEffect(() => {
    if (initialUserName) {
      setUserName(initialUserName);
    }
  }, [initialUserName]);

  return (
    <header className={styles.userHeaderContainer}>
      {isEditing ? (
        <UserEditForm
          firstName={firstName}
          lastName={lastName}
          onCancel={handleCancel}
          onSave={handleSave}
          userName={currentUserName}
          setUserName={setUserName}
        />
      ) : (
        <>
          <h1>
            Welcome back
            <br />
            {firstName && lastName ? `${firstName} ${lastName}!` : ""}
          </h1>

          <GreenButton
            content={"Edit Name"}
            onClick={handleEdit}
            isEdit
          ></GreenButton>
        </>
      )}
    </header>
  );
};

export default UserHeader;
