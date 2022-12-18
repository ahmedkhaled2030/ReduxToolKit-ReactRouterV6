import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./state";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import RootLayout from "./pages/RootLayout";

import Index from "./pages/Index";
import ErrorPage from "./pages/ErrorPage";

const AddPost = React.lazy(() => import("./pages/AddPost"));
const EditPost = React.lazy(() => import("./pages/EditPost"));
const Details = React.lazy(() => import("./pages/Details"));

const postParamHandler = ({ params }) => {
  if (isNaN(params.id)) {
    throw new Response("Bad Request", {
      statusText: "please make sure to insert correct post ID",
      status: 400,
    });
  }
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Index /> },
      { path: "post", element: <Index /> },
      {
        path: "post/add",
        element: (
          <Suspense fallback="loading Please Wait...">
            <AddPost item="aaaaaaaa" />{" "}
          </Suspense>
        ),
      },
      //if the addPost wrapped  with HOC with guard if you need to pass  props to it it will firstly to with guard then to the addPost
      {
        path: "post/:id",
        element: (
          <Suspense fallback="loading Please Wait...">
            <Details />
          </Suspense>
        ),
        loader: postParamHandler,
      },
      {
        path: "post/:id/edit",
        element: (
          <Suspense fallback="loading Please Wait...">
            <EditPost />
          </Suspense>
        ),
        loader: postParamHandler,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
