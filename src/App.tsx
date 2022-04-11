import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Authtication from "./UI/authtication/Authtication";
import Home from "./UI/Home";
import Login from "./UI/Login";

import { useSelector } from "react-redux";

import Addpost from "./UI/Addpost";
import { RootState } from "../../frontend/src/store";

function App() {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  return (
    <div>
      <div></div>
      <Routes>
        {isAuth && (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/addpost" element={<Addpost />} />
          </>
        )}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Authtication />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
