import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../pages/Layout/layout.jsx";
import Dashboard from "../pages/Dashboard/dashboard.jsx";
import NotFound from "../components/NotFound/index.jsx";
import Login from "../pages/SignIn/signin.jsx";
import SignUp from "../pages/Signup/index.jsx";
// import PrivateRoute from "../authentication/PrivateRoute.jsx";
import Case from "../pages/Cases/case.jsx";
function AllRouter() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/layout" element={<Layout />}>
          <Route
            index
            element={
              // <PrivateRoute>
                <Dashboard />
              // </PrivateRoute>
            }
          />
          <Route
            path="case"
            element={
              // <PrivateRoute>
                <Case />
              // </PrivateRoute>
            }
          />
          

        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AllRouter;
