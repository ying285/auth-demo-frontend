import React, { useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../style/Addpost.scss";
import LoadingBar from "react-top-loading-bar";

const Addpost = () => {
  const titleInputRef = useRef<HTMLInputElement>(null);
  const contentInputRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredInputTitle = titleInputRef.current?.value.trim();
    const enteredInputContent = contentInputRef.current?.value.trim();
    if (enteredInputTitle !== "" && enteredInputContent !== "") {
      const token: string = localStorage.getItem("token")!;
      axios
        .post(
          "http://localhost:5000/api/addpost",
          {
            title: enteredInputTitle,
            content: enteredInputContent,
          },
          {
            headers: {
              token,
            },
          }
        )
        .then((res) => {
          console.log(res);
          navigate("/home");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="bg-dark d-flex justify-content-center">
      <LoadingBar
        color="#f11946"
        progress={progress}
        shadow={true}
        height={4}
        onLoaderFinished={() => setProgress(0)}
      />
      <form
        className="addpost"
        method="post"
        onSubmit={submitHandler}
        encType="multipart/form-data"
      >
        <h3 className="mb-5 text-center text-white">Add Your Post</h3>

        <div className="mb-4 d-block">
          <label className="me-5 text-white">Title</label>
          <div>
            <input
              type="text"
              name="title"
              placeholder="e.g  title"
              className="border-0 p-2 shadow-sm rounded"
              ref={titleInputRef}
            />
          </div>
        </div>

        <div className="mb-4 d-block">
          <label className="text-white">Content</label>
          <div>
            <textarea
              name="content"
              className="border-0 p-2 shadow-sm rounded"
              ref={contentInputRef}
            />
          </div>
        </div>

        <p className="text-center">
          <Link
            to="/home"
            className="text-white"
            onClick={() => setProgress(100)}
          >
            Back to Home Page
          </Link>
        </p>

        <button
          className="border-0 p-1 mt-4 rounded shadow-sm d-block"
          onClick={() => setProgress(100)}
        >
          Add Post
        </button>
      </form>
    </div>
  );
};

export default Addpost;
