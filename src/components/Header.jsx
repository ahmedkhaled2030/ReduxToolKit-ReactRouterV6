
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import "./Header.css";

const Header = ({isLoggedIn}) => {
  const dispatch = useDispatch();
  const loginHandler  = () => {

    dispatch({type:"auth/SwitchLogin" })
  }
  return (
    <div className="header">
      <h1>CRUD APP</h1>
      <ul className="nav">
        <li>
          <NavLink to="/" end>
            Home
          </NavLink>
        </li>
        {isLoggedIn ? (
          <li>
            <NavLink to="post/add">Add Post</NavLink>
          </li>
        ) : (
          ""
        )}
        {isLoggedIn ? (   <li className="login" style={{cursor:"pointer"}} onClick={loginHandler}>Logout</li>):(   <li className="login" style={{cursor:"pointer"}} onClick={loginHandler}>Login</li>)}

     
      </ul>
    </div>
  );
};

export default Header;
