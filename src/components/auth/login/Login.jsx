import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);

  const changeHandler = (e, key) => {
    if (key === "email") {
      setEmail(e.target.value);
      localStorage.setItem("email", email);
    } else if (key === "password") {
      setPassword(e.target.value);
      localStorage.setItem("password", password);
    }
  };

  const loginHandler = () => {
    if (email === "admin@gmail.com" && password === "admin") {
      setLoginStatus(true);
      navigate("/todos");
    } else {
      alert("Please Enter valid Email and Password");
    }
  };
  return (
    <div>
      <Helmet>
        <title>Login</title>
      </Helmet>

      <section className="vh-90">
        <div className="container py-5 h-75">
          <div className="row d-flex align-items-center justify-content-center h-70">
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <h1 className="mb-2">SignIn</h1>
              <form>
                {/* Email input  */}
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="form1Example13"
                    placeholder="Enter Email"
                    className="form-control form-control-lg"
                    required
                    onBlur={(e) => {
                      changeHandler(e, "email");
                    }}
                  />
                  <label className="form-label" htmlFor="form1Example13">
                    Email address
                  </label>
                </div>

                {/* Password input */}
                <div className="form-outline mb-4">
                  <input
                    type="password"
                    placeholder="Enter Password"
                    id="form1Example23"
                    className="form-control form-control-lg"
                    required
                    onBlur={(e) => {
                      changeHandler(e, "password");
                    }}
                  />
                  <label className="form-label" htmlFor="form1Example23">
                    Password
                  </label>
                </div>

                {/* Submit button  */}
                <button
                  type="submit"
                  className="btn btn-primary btn-lg btn-block"
                  onClick={loginHandler}
                >
                  Sign in
                </button>
                <br />
                <hr />
                <Link to="/signup" className="btn btn-warning mt-2">
                  Create an Account
                </Link>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
