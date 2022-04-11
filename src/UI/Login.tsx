import React, { useRef, useState } from "react";
import "../style/Authtication.scss";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";
import LoadingBar from "react-top-loading-bar";

const Login = () => {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(0);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredInputEmail = emailInputRef.current?.value.trim();
    const enteredInputPassword = passwordInputRef.current?.value.trim();

    if (enteredInputEmail !== "" && enteredInputPassword !== "") {
      axios
        .post("http://localhost:5000/user/login", {
          email: enteredInputEmail,
          password: enteredInputPassword,
        })
        .then((res) => {
          console.log(res.data.token);
          localStorage.setItem("token", res.data.token);
          dispatch(authActions.isAuthHandler());

          navigate("/home");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="bg-warning d-flex justify-content-center auth">
      <LoadingBar
        color="#f11946"
        progress={progress}
        shadow={true}
        height={4}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="mt-5">
        <form onSubmit={submitHandler}>
          <h3 className="mb-5 text-center">Logga In</h3>

          <div className="mb-4 d-block">
            <label className="me-5">Your email</label>
            <div>
              <input
                type="email"
                placeholder="e.g  example@example.com"
                className="border-0 p-2 shadow-sm rounded"
                ref={emailInputRef}
              />
              <i className="bi bi-envelope text-secondary" />
            </div>
          </div>

          <div className="mb-4 d-block">
            <label>Your Password</label>
            <div>
              <input
                type="password"
                placeholder="e.g  ***********"
                className="border-0 p-2 shadow-sm rounded"
                ref={passwordInputRef}
              />
              <i className="bi bi bi-eye text-secondary" />
            </div>
          </div>

          <p className="text-center">
            <Link to="/" className="text-dark">
              Switch to Signup
            </Link>
          </p>

          <button
            className="border-0 p-1 mt-4 rounded shadow-sm d-block"
            onClick={() => setProgress(100)}
          >
            Logga in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
