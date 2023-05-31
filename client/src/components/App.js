import React from 'react';
import { Route, Routes } from "react-router-dom";
import { useContext } from "react";

import "../stylesheets/App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Container from 'react-bootstrap/Container';

import { Context } from "./ContextProvider";
import Home from "./Home";
import SeriesSubmissions from "./SeriesSubmissions";
import UserSeriesSubmissions from "./UserSeriesSubmissions";
import UserCharacterSubmissions from "./UserCharacterSubmissions";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LoginSuccess from "./LoginSuccess";
import UserPage from "./UserPage";

function App() {
  // const { token, username } = useContext(Context);
  return (
    <div className="page mh-100">
      <Navbar />
      <Container fluid>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/allSeries" element={<SeriesSubmissions />} />
          <Route exact path="/mySeries" element={<UserSeriesSubmissions />} />
          <Route exact path="/myCharacters" element={<UserCharacterSubmissions />} />
          <Route exact path="/login/success" element={<LoginSuccess />} />
          <Route path="/user/:username" element={<UserPage />} />
        </Routes>
      </Container>
      <Footer />
    </div>
  );
}

export default App;