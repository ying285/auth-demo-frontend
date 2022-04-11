import React, { useState, useRef } from "react";
import "../../style/Authtication.scss";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import LoadingBar from "react-top-loading-bar";

const AuthForm = () => {
  const [progress, setProgress] = useState(0);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const errors = useSelector((state: RootState) => state.auth.error);

  const emailErr = errors.filter((error: any) => error.param === "email");
  const passwordErr = errors.filter((error: any) => error.param === "password");
  const nameErr = errors.filter((error: any) => error.param === "username");

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredInputEmail = emailInputRef.current?.value;
    const enteredInputPassword = passwordInputRef.current?.value;
    const enteredInputName = nameInputRef.current?.value;

    axios
      .post("http://localhost:5000/user/signup", {
        email: enteredInputEmail,
        password: enteredInputPassword,
        username: enteredInputName,
      })
      .then((res) => {
        if (res.data.error === undefined) {
          navigate("/login");
        } else {
          dispatch(authActions.getErrorMessage(res.data.error));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="mt-5">
      <LoadingBar
        color="#f11946"
        progress={progress}
        shadow={true}
        height={4}
        onLoaderFinished={() => setProgress(0)}
      />
      <form className=" mb-5" onSubmit={submitHandler} noValidate>
        <h3 className=" text-center">Sign Up</h3>

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
          <p className="text-danger mt-2">{errors && emailErr[0]?.msg}</p>
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
            <p className="text-danger mt-2">{errors && passwordErr[0]?.msg}</p>
          </div>
        </div>

        <div className="mb-4 d-block">
          <label>Your Name</label>
          <div>
            <input
              type="text"
              placeholder="e.g  John"
              className="border-0 p-2 shadow-sm rounded"
              ref={nameInputRef}
            />
            <i className="bi bi-person-fill text-secondary" />
            <p className="text-danger mt-2">{errors && nameErr[0]?.msg}</p>
          </div>
        </div>
        <p className="text-center ">
          <Link to="/login" className="text-dark">
            Switch to Login
          </Link>
        </p>

        <button
          className="border-0 p-1 mt-4 rounded shadow-sm d-block"
          onClick={() => setProgress(100)}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
