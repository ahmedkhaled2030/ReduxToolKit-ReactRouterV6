import React from "react";
import { useSelector } from "react-redux";

const withGuard = (Component) => {
    // const { isLoggedIn } = useSelector((state) => state.auth); //React Hook "useSelector" is called in function
  //  "withGuard" that is neither a React function component nor a custom React Hook function
    const Wrapper = (props) => {
        const { isLoggedIn } = useSelector((state) => state.auth);
    console.log(props); //come from index.js from routing
    return isLoggedIn ?  (<Component {...props} age="asd" />) : (<div>Please Log in first!</div>); // send the props come from index.js from routing to the component it self
  };
  return Wrapper;
};

export default withGuard;
