import React, { useState } from "react";
import "../../style/Authtication.scss";
import AuthForm from "./AuthForm";

const Authtication = () => {
  return (
    <div className="bg-warning d-flex justify-content-center auth">
      <AuthForm />
    </div>
  );
};

export default Authtication;
