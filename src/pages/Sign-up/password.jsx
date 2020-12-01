import React, { useState } from "react";
import Header from "../../reusable-components/header/header";

import "./password.css";
import { updatePassword } from "../../api/password";
import Cookies from "universal-cookie";

const Password = (props) => {
  const { state } = props.location;
  props = state;
  console.log(props);
  const [password, setPassword] = useState();
  const [repeatPassword, setrepeatPassword] = useState();

  const setPasswordHandler = async () => {

    const cookies = new Cookies();
    cookies.set('check_link', '/');

    if (password === repeatPassword && password.length !== 0) {
      let res = await updatePassword(props.ownerId, { password: password });
      return res.success;
    }
  };
  return (
    <>
      <Header
        backLink=""
        title="Password"
        checkLink="/add-bank-card"
        checkFunction={setPasswordHandler}
      />
      <div id="password-container">
        <div id="password-body">
          <div className="enter-password">
            <div style={{ color: "#199bd2" }}>Please enter Password</div>
            <input
              className="password-input"
              type="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>
          <div className="re-enter-password">
            <div style={{ color: "#199bd2" }}>Repeat Password</div>
            <input
              className="password-input"
              type="password"
              value={repeatPassword}
              onChange={(event) => {
                setrepeatPassword(event.target.value);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Password;
