import React from 'react';
import { Route, Routes } from "react-router-dom";
import { useContext } from "react";

import "../stylesheets/App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Container from 'react-bootstrap/Container';

import { Context } from "./ContextProvider";
import Home from "./Home";
import PageAllSeries from "./PageAllSeries";
import PageMySeries from "./PageMySeries";
import PageMyCharacters from "./PageMyCharacters";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LoginSuccess from "./LoginSuccess";
import PageUser from "./PageUser";

function App() {
  // const { token, username } = useContext(Context);
  return (
    <div className="page mh-100">
      <Navbar />
      <Container fluid>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/allSeries" element={<PageAllSeries />} />
          <Route exact path="/mySeries" element={<PageMySeries />} />
          <Route exact path="/myCharacters" element={<PageMyCharacters />} />
          <Route exact path="/login/success" element={<LoginSuccess />} />
          <Route path="/user/:username" element={<PageUser />} />
        </Routes>
      </Container>
      <Footer />
    </div>
  );
}

export default App;