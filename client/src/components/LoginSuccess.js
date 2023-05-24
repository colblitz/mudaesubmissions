import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "./ContextProvider";

const LoginSuccess = () => {
  console.log("LoginSuccess start");
  const { setTokenHandler, token, setUsernameHandler } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Got token: ", token);
    if (token) {
      console.log("going to /");
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const username = urlParams.get("username");
    console.log("Got token/username from url params: ", token, username);
    if (token) {
      console.log("Setting token and username");
      setTokenHandler(token);
      setUsernameHandler(username);
      setTimeout(() => navigate("/"), 100);
    } else {
      navigate("/");
    }
  }, [setTokenHandler, navigate, setUsernameHandler]);

  return (
    <div>
      Shouldn't get here?
    </div>
  );
};

export default LoginSuccess;
