import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Error from "./pages/Error";
import "./global.css";
import SignIn from "./pages/SignIn";
import { PersistGate } from "redux-persist/integration/react";
import User from "./pages/User";
import ProtectedRoute from "./components/ProtectedRoute";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* si loading long alors composant style spinner*/}
        <div className="app-container">
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signIn" element={<SignIn />} />
              <Route path="/user" element={<ProtectedRoute />}>
                <Route index element={<User />} />
              </Route>
              <Route path="*" element={<Error />} />
            </Routes>
          </Router>
          <Footer />
        </div>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
