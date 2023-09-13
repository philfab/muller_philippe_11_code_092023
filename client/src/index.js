import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Error from "./pages/Error";
import "./global.css";
import SignIn from "./pages/SignIn";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
<React.StrictMode>
  <Provider store={store}>
    <div className="app-container">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  </Provider>
</React.StrictMode>
);
