import React, { useEffect } from "react";
import "./home.css";
import Navbar from "../../Components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const Navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("userid")) {
      null;
    } else {
      Navigate("/login");
    }
  }, [localStorage.getItem("userid")]);
  return (
    <div>
      <Navbar />
    </div>
  );
};

export default Home;
