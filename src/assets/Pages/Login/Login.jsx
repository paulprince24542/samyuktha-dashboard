import React, { useState } from "react";
import "./Login.css";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebase from "../../../firebase/firebase";
import { useNavigate } from "react-router-dom";

const auth = getAuth();

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function login(e) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        localStorage.setItem("userid", user.uid);
        localStorage.setItem("verified", user.emailVerified);
        localStorage.setItem("jwt", user.accessToken);
        navigate("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  return (
    <div>
      <div className="container">
        <div className="d-flex justify-content-center align-items-center tx">
          <div className="login-box">
            {/* <h2>Admin Login</h2>
            <input type="text" placeholder="Username" />
            <input type="text" placeholder="Password" />
            <button className="btn btn-primary">Login</button> */}
            <h2>Admin Login</h2>
            <form>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-danger" onClick={login}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
