import React from "react";
import Home from "../components/Home";
import { useAuth } from "../contexts/AuthContext";
import SignIn from "./Authentication/SignIn";
import Register from "./Register";
import ForgetPassword from "./Authentication/ForgetPassword";
import { Routes, Route } from "react-router-dom";
import { HashLoader } from "react-spinners";
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
          <Route path="/*" element={<Home user={currentUser.email} />} />
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
            <Routes>
              <Route
                path="*"
                element={
                  <>
                    <SignIn />
                    <div className="h-4/5 mt-10 absolute border-l-2 border-black" />
                    <Register />
                  </>
                }
              />
              <Route path="/forgetpassword" element={<ForgetPassword />} />
            </Routes>
          )}
        </div>
      )}
    </>
  );
}

export default HomePage;
