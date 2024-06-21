import React, { useState } from "react";
// import "./Register.css";
import { Button, Col, Form, Image, Modal, NavLink, Row } from "react-bootstrap";
import loginImage from "../../assets/images/register.png";
import AuthService from "../../services/Auth.service";
const emailExpresion = RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/);

const Register = (props) => {
  const [validated, setValidated] = useState({});
  // const [registerData, setRegisterData] = useState({
  //   doctorEmail: "",
  //   specialization: '',
  //   yearsOfExperience: 0,
  //   doctorName: '',
  //   password: "",
  //   city: "",
  //   image: ""
  // });
  const [registerData, setRegisterData] = useState({
    emailId: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name !== "confirmPassword")
      setRegisterData({ ...registerData, [name]: value });

    switch (name) {
      case "emailId":
        if (!emailExpresion.test(value)) setValidated({ email: "invalid" });
        else {
          delete validated.email;
        }
        break;
      case "password":
        if (value.length < 6) setValidated({ pass: "invalid" });
        else {
          delete validated.pass;
        }
        break;
      case "confirmPassword":
        setRegisterData((state) => {
          if (state.password === value) delete validated.con_pass;
          else setValidated({ con_pass: "not matched" });
          return state;
        });
        break;
      default:
        break;
    }
  };

  const submit = (event) => {
    event.preventDefault();
    console.log(registerData);
    if (registerData.role === "doctor")
      AuthService.registerDoctor(registerData)
        .then((res) => {
          openLoginModal();
          console.log(res);
        })
        .catch((err) => console.error(err));
    else
      AuthService.registerPatient(registerData)
        .then((res) => {
          openLoginModal();
          console.log(res);
        })
        .catch((err) => console.error(err));
  };

  const openLoginModal = () => {
    props.handleModal();
    props.openLoginModal();
  };
  const onHide = () => {
    setRegisterData({});
    setValidated({});
    props.handleModal();
  };

  return (
    <React.Fragment>
      <form>
        {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}
        <div className="row mb-4">
          <div className="col">
            <div data-mdb-input-init className="form-outline">
              <input type="text" id="form3Example1" className="form-control" />
              <label className="form-label" htmlFor="form3Example1">
                First name
              </label>
            </div>
          </div>
          <div className="col">
            <div data-mdb-input-init className="form-outline">
              <input type="text" id="form3Example2" className="form-control" />
              <label className="form-label" htmlFor="form3Example2">
                Last name
              </label>
            </div>
          </div>
        </div>

        {/* <!-- Email input --> */}
        <div data-mdb-input-init className="form-outline mb-4">
          <input type="email" id="form3Example3" className="form-control" />
          <label className="form-label" htmlFor="form3Example3">
            Email address
          </label>
        </div>

        {/* <!-- Password input --> */}
        <div data-mdb-input-init className="form-outline mb-4">
          <input type="password" id="form3Example4" className="form-control" />
          <label className="form-label" htmlFor="form3Example4">
            Password
          </label>
        </div>

        {/* <!-- Submit button --> */}
        <button
          data-mdb-ripple-init
          type="button"
          className="btn btn-primary btn-block mb-4"
        >
          Sign up
        </button>

        {/* <!-- Login buttons --> */}
        <div className="text-center">
          <p>
            <a href="./login">or Login:</a>
          </p>
        </div>
      </form>
    </React.Fragment>
  );
};

export default Register;
