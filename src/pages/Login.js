import React from "react";

import "../components/Button/Button.scss";

const Login = props => {
  return (
    <a
      href="http://localhost:3000/spotify/login"
      className="button button-default button-lg"
    >
      Login with spotify
    </a>
  );
};

export default Login;
