import React, { useState } from "react";
import Header from "../../reusable-components/header/header";
import LoginAPI from "../../api/login";
import "./login.css";
const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const login = async () => {
    try {
      const res = await LoginAPI(
        {
          phone_number: phoneNumber,
          password: password,
        },
        "POST"
      );
      if (res.success) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };
  return (
    <>
      <Header
        backLink=""
        title="Login"
        checkLink="/apartments-list"
        checkFunction={login}
      />
      <form id="login-form">
        <div>
          <label htmlFor="login-phone-number">Please enter Phone Number</label>
          <input
            id="login-phone-number"
            type="text"
            value={phoneNumber}
            onChange={(event) => {
              setPhoneNumber(event.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="login-password">Please enter password</label>
          <input
            id="login-password"
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        <div>
          <a href="/forgot-password" style={{ color: "#199bd2" }}>
            Forgot Password?
          </a>
        </div>
      </form>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div>or</div>

        <div>
          <a href="/signup" style={{ color: "#199bd2" }}>
            Sign Up
          </a>
        </div>
      </div>
    </>
  );
};
export default Login;
