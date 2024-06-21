import React, { useState } from "react";
import { Button, Col, Form, Image, Modal, NavLink, Row } from "react-bootstrap";

const emailExpresion = RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/);

const Login = () => {
  return (
    <React.Fragment>
      <form>
        {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}

        {/* <!-- Email input --> */}
        <div data-mdb-input-init className="form-outline mb-4">
          <input type="email" id="form3Example3" className="form-control" />
          <label className="form-label" for="form3Example3">
            Email address
          </label>
        </div>

        {/* <!-- Password input --> */}
        <div data-mdb-input-init className="form-outline mb-4">
          <input type="password" id="form3Example4" className="form-control" />
          <label className="form-label" for="form3Example4">
            Password
          </label>
        </div>

        {/* <!-- Submit button --> */}
        <button
          data-mdb-ripple-init
          type="button"
          className="btn btn-primary btn-block mb-4"
        >
          Log In
        </button>

        {/* <!-- Login buttons --> */}
        <div className="text-center">
          <label className="form-label" for="form3Example4">
            Don't Have An Account ?
          </label>{" "}
          <p>
            <a href="./registration">Signup</a>
          </p>
        </div>
      </form>
    </React.Fragment>
  );
};

export default Login;
