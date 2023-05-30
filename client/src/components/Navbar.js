import { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import { Context } from "./ContextProvider";
// import { BASE_URL } from "../api";

function NavigationBar() {
  console.log("Navbar start");
  
  const { token, username, setTokenHandler, setUsernameHandler } = useContext(Context);
  const navigate = useNavigate();

  const discordAuth = (event) => {
    event.target.disabled = true;
    window.open("/auth/discord/callback", "_self");
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">MudaeSubmissions</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavLink className="nav-link" to="/">
                Submissions
              </NavLink>
              {token && (
                <NavLink className="nav-link" to="/mySeries">
                  My Series
                </NavLink>
              )}
              {token && (
                <NavLink className="nav-link" to="/myCharacters">
                  My Characters
                </NavLink>
              )}
            </Nav>
            <Nav>
              {!token && (
                <NavLink className="nav-link" onClick={discordAuth}>
                  Login
                </NavLink>
              )}
              {token && (
                <>
                  <NavLink
                    className="nav-link"
                    onClick={() => {
                      setTokenHandler("");
                      setUsernameHandler("");
                      setTimeout(() => navigate("/"), 100);
                    }}
                  >
                    Logout
                  </NavLink>
                  <NavLink className="nav-link">{username}</NavLink>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavigationBar;
