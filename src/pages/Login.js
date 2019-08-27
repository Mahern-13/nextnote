import React from "react";

import "../components/Button/Button.scss";
import "./pages.scss";

const Login = () => {
  return (
    <a
      href="http://localhost:3000/spotify/login"
      className="button button-primary button-lg login-button"
    >
      Login with Spotify
    </a>
  );
};

export default Login;
