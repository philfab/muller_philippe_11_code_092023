import UserEditForm from "../UserEditForm";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserName } from "../../redux/thunks/updateUserName";

const UserHeader = () => {
    const [isEditing, setIsEditing] = useState(false);
    const auth = useSelector((state) => state.auth);
    const { firstName, lastName, userName: initialUserName } = auth.user || {};
    const [currentUserName, setUserName] = useState(initialUserName || "");
  
    const handleCancel = () => {
      setUserName(initialUserName);
      setIsEditing(false);
    };

    const dispatch = useDispatch();

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
    <header className="header">
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
          <button onClick={() => setIsEditing(true)}>Edit Name</button>
        </>
      )}
    </header>
  );
};

export default UserHeader;
