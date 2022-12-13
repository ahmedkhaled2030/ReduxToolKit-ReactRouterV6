import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { insertPost } from "../state/postSlice";
import { Form, Button } from "react-bootstrap";
import Loading from "../components/Loading";
import withGuard from "../util/withGuard";
import { useFormik } from "formik";
import * as Yup from "yup";
import { postSchema } from "../util/validationSchema";

const AddPost = (props) => {
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: postSchema,
    onSubmit: (values) => {
      const id = Math.floor(Math.random() * 500);
      dispatch(
        insertPost({ id, title: values.title, description: values.description })
      )
        .unwrap()
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.posts);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title" //formik
          value={formik.values.title} //formik
          onChange={formik.handleChange} //formik
          isInvalid={!!formik.errors.title}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.title}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
        />
        {formik.errors.description && formik.touched.description ? (
          <div>{formik.errors.description}</div>
        ) : null}
      </Form.Group>
      <Loading loading={loading} error={error}>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Loading>
    </Form>
  );
};

export default withGuard(AddPost);
