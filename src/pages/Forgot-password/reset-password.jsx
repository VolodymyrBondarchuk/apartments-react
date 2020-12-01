import React, { useState } from "react";
import Header from "../../reusable-components/header/header";
import "./reset-password.css";
import { resetPassword } from "../../api/recover-password";
import { updatePassword } from "../../api/password";
const Password = (props) => {
  console.log(props);
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");
  const resetPasswordHandler = async () => {
    if (newPassword === repeatNewPassword && newPassword.length !== 0) {
      let res = await updatePassword(props.location.state.personal_id, {
        password: newPassword,
      });
      return res.success;
    }
    try {
      let res = await resetPassword(props.owner_id, { password: newPassword });
      if (res.success) {
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Header
        backLink=""
        title="Reset Password"
        checkLink="/"
        checkFunction={resetPasswordHandler}
      />
      <div id="password-container">
        <div id="password-body">
          <div className="enter-password">
            <div style={{ color: "#199bd2" }}>Please enter New Password</div>
            <input
              className="password-input"
              type="password"
              value={newPassword}
              onChange={(event) => {
                setNewPassword(event.target.value);
              }}
            />
          </div>
          <div className="re-enter-password">
            <div style={{ color: "#199bd2" }}>Repeat New Password</div>
            <input
              className="password-input"
              type="password"
              value={repeatNewPassword}
              onChange={(event) => {
                setRepeatNewPassword(event.target.value);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Password;
