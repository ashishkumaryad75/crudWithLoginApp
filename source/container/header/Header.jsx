import React, { useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import Login from "../../components/login/Login";
import Register from "../../components/register/Register";

const Header = () => {
  //   const [showLogin, setShowLogin] = useState(false);
  //   const [showRegister, setShowRegister] = useState(false);

  //   const handleLoginModal = () => setShowLogin(!showLogin);
  //   const handleRegisterModal = () => setShowRegister(!showRegister);

  return (
    <React.Fragment>
      <div className="container">
        <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
          <div className="col-md-3 mb-2 mb-md-0">
            <a
              href="/"
              className="d-inline-flex link-body-emphasis text-decoration-none"
            >
              <svg
                className="bi"
                width="40"
                height="32"
                role="img"
                aria-label="Bootstrap"
              >
                <use xlink:href="#bootstrap"></use>
              </svg>
            </a>
          </div>

          <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <li>
              <a className="nav-link px-2 link-primary">Crud App</a>
            </li>
          </ul>
          <div className="col-md-3 text-end">
            <button type="button" className="btn btn-outline-primary me-2">
              {"btnName"}
            </button>
          </div>
        </header>
      </div>
      {/* <Login
        show={showLogin}
        handleModal={handleLoginModal}
        openRegisterModal={handleRegisterModal}
      /> */}
      {/* <Register
        show={showRegister}
        handleModal={handleRegisterModal}
        openLoginModal={handleLoginModal}
      /> */}
    </React.Fragment>
  );
};

export default Header;
