import React from "react";
import AdminHome from "../components/AdminHome";
import { useAuth } from "../contexts/AuthContext";
import SignIn from "./Authentication/SignIn";
import Register from "./Authentication/Register";
import ForgetPassword from "./Authentication/ForgetPassword";
import { Routes, Route } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { ToastContainer } from "react-toastify";
import logo from "../res/AICTE_logo.png";

function HomePage() {
  const currentUser = useAuth();
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <>
      {currentUser && currentUser.currentUser ? (
        <Routes>
          <Route path="/*" element={<AdminHome user={currentUser.email} />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
        </Routes>
      ) : (
        <div className="flex mt-10 items-center justify-evenly ">
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "85vh",
                width: "100%",
              }}
            >
              <HashLoader
                className="darkMode"
                size={36}
                margin={2}
                loading={loading}
              />
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center">
              <img className="h-28 mt-2  mx-auto w-28" src={logo} alt="Logo" />
              <Routes>
                <Route path="*" element={<SignIn />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgetpassword" element={<ForgetPassword />} />
              </Routes>
            </div>
          )}
        </div>
      )}
      <ToastContainer />
    </>
  );
}

export default HomePage;
