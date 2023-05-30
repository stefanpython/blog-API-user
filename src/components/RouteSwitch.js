import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import React from "react";
import "../App.css";
import Nav from "./Nav";
import Post from "./Post";
import Description from "./Description";
import SinglePost from "./SinglePost";

const RouterSwitch = () => {
  return (
    <HashRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/posts/:id" element={<SinglePost />} />
      </Routes>
    </HashRouter>
  );
};

const Homepage = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/" && <Description />}
      <Post />
    </>
  );
};

export default RouterSwitch;
