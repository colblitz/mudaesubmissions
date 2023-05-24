import React from 'react';
import { Route, Routes } from "react-router-dom";
import { useContext } from "react";

import "../stylesheets/App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Context } from "./ContextProvider";
import Home from "./Home";
import UserPage from "./UserPage";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LoginSuccess from "./LoginSuccess";

function App() {
  // const { token, username } = useContext(Context);
  return (
    <React.Fragment>
    <Navbar />
    <div className="page">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/me" element={<UserPage />} />
        <Route exact path="/login/success" element={<LoginSuccess />} />
      </Routes>
    </div>
    <Footer />
    </React.Fragment>
  );
}

export default App;
