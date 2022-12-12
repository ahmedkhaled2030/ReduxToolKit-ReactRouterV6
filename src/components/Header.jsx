import React from "react";
import { NavLink } from "react-router-dom";
import './Header.css';

const Header = () => {
  return (
    <div className="navbar">
      <h1 >

      <NavLink className='logo' to="/" >CRUD</NavLink>
      </h1>
      <ul className="list-wrapper">
        {/* <li className="list-item">
          <NavLink className='link' to="/" end>Home</NavLink>
        </li> */}
        <li className="list-item">
          <NavLink className='link' to="/post/add">AddPost</NavLink>
        </li>
        <li className="list-item">Login</li>
      </ul>
    </div>
  );
};

export default Header;
