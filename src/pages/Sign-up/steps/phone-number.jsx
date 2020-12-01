import React, { useState } from "react";
import Header from "../../../reusable-components/header/header";
import { sendVerificationCode } from "../../../api/verification-code";
// import { sendVerificationCode } from "../../../api/password";
const PhoneNumber = (props) => {
  let propsPhoneNumber = props.location.state.phoneNumber;

  const [animationStyle, setAnimationStyle] = useState({});
  const [inputBorderStyle, setInputBorderStyle] = useState({});

  const phoneNumber = `${propsPhoneNumber[0]} (**) ** ${
    propsPhoneNumber[propsPhoneNumber.length - 2]
  }${propsPhoneNumber[propsPhoneNumber.length - 1]}`;

  const sendVerificationCodeHandler = async () => {
    try {
      let res = await sendVerificationCode({
        personal_id: props.location.state.ownerId,
      });
      if (res.success) {
        return {
          phoneNumber: props.location.state.phoneNumber,
          ownerId: props.location.state.ownerId,
        };
      }
      return false;
    } catch (error) {}
  };

  return (
    <>
      <Header
        backLink=""
        title="Phone Number"
        checkLink="/confirmation-code"
        checkFunction={sendVerificationCodeHandler}
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
            // onChange={(event) => {
            //   setPhoneNumber(event.target.value);
            // }}
            id="data"
            style={inputBorderStyle}
            type={Object.keys(inputBorderStyle).length ? "text" : "hidden"}
          />
        </div>
      </div>
    </>
  );
};

export default PhoneNumber;
