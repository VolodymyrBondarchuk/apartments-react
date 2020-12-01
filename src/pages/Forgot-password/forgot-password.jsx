import React, { useState } from "react";
import Header from "../../reusable-components/header/header";
import { SendVerificationCodeForPassRecovery } from "../../api/recover-password";
const ForgotPassword = () => {
  const [animationStyle, setAnimationStyle] = useState({});
  const [inputBorderStyle, setInputBorderStyle] = useState({});
  const [phoneNumber, setPhoneNumber] = useState("");

  const sendVerificationCodeForPassRecoveryHandler = async () => {
    try {
      let res = await SendVerificationCodeForPassRecovery({
        phone_number: phoneNumber,
      });
      if (res.success) {
        return phoneNumber;
      }
      return false;
    } catch (error) {}
  };
  return (
    <>
      <Header
        checkLink="/forgot-password-confirm-code"
        backLink="/"
        title="Recover Password"
        checkFunction={sendVerificationCodeForPassRecoveryHandler}
      />

      <div className="sign-up-container">
        <div className="sign-up-body-container">
          <div className="sign-up-body" style={animationStyle}>
            <div
              onClick={() => {
                let newStyles;

                if (Object.keys(animationStyle).length === 0) {
                  newStyles = {
                    transform: "translateY(-20%)",
                    fontSize: "small",
                    height: "30px",
                  };
                  setAnimationStyle(newStyles);
                  setInputBorderStyle({
                    "border-bottom": "1px solid #d6cfcf",
                  });
                } else {
                  setAnimationStyle({});
                  setInputBorderStyle({});
                }
              }}
            >
              Please enter phone number
            </div>
          </div>
          <input
            value={phoneNumber}
            onChange={(event) => {
              setPhoneNumber(event.target.value);
            }}
            id="data"
            style={inputBorderStyle}
            type={Object.keys(inputBorderStyle).length ? "text" : "hidden"}
          />
        </div>
      </div>
    </>
  );
};
export default ForgotPassword;
