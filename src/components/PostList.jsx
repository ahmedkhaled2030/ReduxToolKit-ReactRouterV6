import React , {memo} from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import PostListItem from "./PostListItem";
import './PostList.css'
const PostList = ({ data ,deleteRecord }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th style={{ width: "10%" }}>Title</th>
          <th style={{ width: "60%" }}>Desc</th>
          <th style={{ width: "10%" }}>Edit</th>
          <th style={{ width: "10%" }}>Delete</th>
        
        </tr>
      </thead>
      <tbody>
        <PostListItem data={data} deleteRecord ={deleteRecord} />
      </tbody>
    </Table>
  );
};

export default memo(PostList);
