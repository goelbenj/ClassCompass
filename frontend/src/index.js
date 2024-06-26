import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import ErrorPage from "./routes/error-page";
import Authentication from "./routes/authentication";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import { CourseCardContextProvider } from "./context/course-card-provider";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebaseConfig from "./config";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getStorage } from "firebase/storage";
import FindClasses from "./components/FindClasses";
import YourClasses from "./components/YourClasses";
import CoursePage from "./components/CoursePage";
// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize firebase
const app = initializeApp(firebaseConfig);
getAuth(app);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <FindClasses />,
      },
      {
        path: "/your-classes",
        element: <YourClasses />,
      },
      {
        path: "/course/:course-code",
        element: <CoursePage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Authentication />,
    errorElement: <ErrorPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CourseCardContextProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </CourseCardContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
