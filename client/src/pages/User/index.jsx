import Account from "../../components/Account";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";

function User() {
  const auth = useSelector((state) => state.auth);
  const { firstName, lastName } = auth.user || {};

  return (
    <main className="main bg-dark">
      <Helmet>
        <title>Argent Bank User Page</title>
      </Helmet>
      <header className="header">
        <h1>
          Welcome back
          <br />
          {firstName && lastName ? `${firstName} ${lastName}!` : ""}
        </h1>
        <button className="edit-button">Edit Name</button>
      </header>

      <h2 className="sr-only">Accounts</h2>

      <Account
        title="Argent Bank Checking (x8349)"
        amount="$2,082.79"
        description="Available Balance"
      />
      <Account
        title="Argent Bank Savings (x6712)"
        amount="$10,928.42"
        description="Available Balance"
      />
      <Account
        title="Argent Bank Credit Card (x8349)"
        amount="$184.30"
        description="Current Balance"
      />
    </main>
  );
}

export default User;
