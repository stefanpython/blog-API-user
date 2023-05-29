import { HashRouter, Routes, Route } from "react-router-dom";
import React from "react";
import "../App.css";
// import App from "../App";
import Nav from "./Nav";
import Post from "./Post";

const RouterSwitch = () => {
  return (
    <HashRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Post />} />
      </Routes>
    </HashRouter>
  );
};

export default RouterSwitch;
