import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="nav-container">
      <ul className="nav-list">
        <li>
          <Link to="/" className="nav-link">
            <h1 className="blog-logo">Blog</h1>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
