import { HashRouter, Routes, Route } from "react-router-dom";
import React from "react";
import "../App.css";
// import App from "../App";
import Nav from "./Nav";
import Post from "./Post";
import Description from "./Description";

const RouterSwitch = () => {
  return (
    <HashRouter>
      <Nav />
      <Description />
      <Routes>
        <Route path="/" element={<Post />} />
      </Routes>
    </HashRouter>
  );
};

export default RouterSwitch;
