import React from "react";
import { useSelector } from "react-redux";

const withGuard = (Component) => {
  console.log(Component , "1")
    // const { isLoggedIn } = useSelector((state) => state.auth); //React Hook "useSelector" is called in function
  //  "withGuard" that is neither a React function component nor a custom React Hook function
  const Wrapper = (props) => {
    console.log(props);
    //come from index.js from routing from the component passed through it
        const { isLoggedIn } = useSelector((state) => state.auth);

    return isLoggedIn ?  (<Component {...props} age="asd"  />) : (<div>Please Log in first!</div>); // send the props come from index.js from routing to the component it self
  };
  return Wrapper;
};




export default withGuard;
