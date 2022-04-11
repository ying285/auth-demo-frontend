import React, { useEffect, useCallback, useState } from "react";
import "../style/Home.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { apiActions } from "../store/api";
import { authActions } from "../store/auth";
import LoadingBar from "react-top-loading-bar";

const Home = () => {
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.api.data);

  const fetchDataHandler = useCallback(async () => {
    try {
      const token: string = localStorage.getItem("token")!;
      const response = await axios.get("http://localhost:5000/api", {
        headers: {
          token,
        },
      });

      dispatch(apiActions.getDataHandler(response.data));
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchDataHandler();
  }, [fetchDataHandler]);

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  return (
    <div className="bg-dark home pt-3">
      <LoadingBar
        color="#f11946"
        progress={progress}
        shadow={true}
        height={4}
        onLoaderFinished={() => setProgress(0)}
      />
      <button className="home_btn" onClick={() => setProgress(100)}>
        <Link to="/addpost" className="text-white">
          GO TO ADD A POST
        </Link>
      </button>

      <button
        className="home_logout"
        onClick={() => {
          logoutHandler();
          setProgress(100);
        }}
      >
        <Link to="/login" className="text-white">
          LOGOUT
        </Link>
      </button>
      <div className="d-flex justify-content-center align-items-center bg-light home_header mb-4 rounded">
        <button
          onClick={() => {
            fetchDataHandler();
            setProgress(100);
          }}
        >
          Fetch Post
        </button>
      </div>
      <div className="home_title bg-light mb-4 rounded d-flex justify-content-center align-items-center ">
        <div className="home_title_area shadow text-white d-flex justify-content-center align-items-center">
          <h1>{data.title}</h1>
        </div>
      </div>
      <div className="home_content bg-light rounded d-flex justify-content-center align-items-center">
        <div className="home_content_area shadow text-white p-5  ">
          <p>{data.content}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
