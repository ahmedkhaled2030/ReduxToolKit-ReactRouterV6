// custom Hooks VS COMPONENT
//custom hooks return data or callback function
//Component return jsx
//but it treated as a component with (render at update state) and props

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchPost } from "../state/postSlice";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const usePostDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { loading, error, record } = useSelector((state) => state.posts);
    console.log(record, "record");
  
    useEffect(() => {
      dispatch(fetchPost(id));
    }, [dispatch, id]);

    return {loading , error ,record}
}

export default usePostDetails; 
