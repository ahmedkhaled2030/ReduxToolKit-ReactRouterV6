import {
  Container,
  Row,
  Col,
  Table,
  Button,
  ButtonGroup,
  NavLink,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import './PostList.css'

const PostListItem = ({ data, deleteRecord }) => {
  const deleteHandler = (item) => {
    if (window.confirm(`Do you really want to delete record : ${item.title}`)) {
      deleteRecord(item.id)
    }

  }
  console.log(data ,"data")
  const records = data?.map((el, idx) => (
    <tr key={el.id}>
      <td>{++idx}</td>
      <td><Link to={`posts/${el.id}`}>{el.title}</Link></td>
      <td>{el.description}</td>
      <td>
        <ButtonGroup aria-label="Basic example">
          <Button variant="success" >Edit</Button>
         
        </ButtonGroup>
      </td>
      <td>
        <ButtonGroup aria-label="Basic example">
         
          <Button variant="danger" onClick={() => deleteHandler(el)}>Delete</Button>
        </ButtonGroup>
      </td>
    </tr>
  ));
  return <>{records}</>;
};

export default PostListItem;
