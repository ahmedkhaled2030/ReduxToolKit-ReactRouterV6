import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Index from "./pages/Index";
import Add from "./pages/Add";
import Details from "./pages/Details";
import Edit from "./pages/Edit";
import ErrorPage from "./pages/ErrorPage";
import { Provider } from "react-redux";
import store from "./state";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "post",
        element: <Index />,
      },
      {
        path: "post/add",
        element: <Add />,
      },
      {
        path: "posts/:id",
        element: <Details />,
        loader: ({ params }) => {
          //loader render before the details initiate before everything
          // loader is an object consists of : request / params: {id:1}
          if (isNaN(params.id)) {
            throw new Response("Bad Request", {
              statusText: "please make sure to insert correct post Id",
              status: 400,
            });
          }
        },
      },
      {
        path: "post/:id/edit",
        element: <Edit />,
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
