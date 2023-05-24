import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Context } from "./ContextProvider";

const UserPage = () => {
	console.log("UserPage start");

  const { token, username } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
    	console.log("Not logged in, redirecting");
      navigate("/");
    } else {
    	console.log("Is logged in, proceed");
    }
  }, []);

  return (
    <div className="user-page">
      Hi {username}. This is your user page.
    </div>
  );
};

export default UserPage;