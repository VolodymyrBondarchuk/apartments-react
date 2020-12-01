import React, { useState } from "react";
import Header from "../../../reusable-components/header/header";
import { confirmCode } from "../../../api/verification-code";
import "../main-sign-up.css";
const ConfirmationCode = (props) => {
  const { state } = props?.location;
  props = state;
  const [animationStyle, setAnimationStyle] = useState({});
  const [inputBorderStyle, setInputBorderStyle] = useState({});
  const [confirmationCode, setConfirmationCode] = useState("");

  const confirmCodeHandler = async () => {


    try {

      let res = await confirmCode({
        phone_number: props.phoneNumber,
        code: Number(confirmationCode),
      });

      if (res.success) {
        res.data.ownerId = props.ownerId;
        return res.data;
      }
      return false;
    } catch (error) {
      console.error(error);
      // throw new Error(error);
    }
  };

  return (
    <>
      <Header
        backLink=""
        title="Confirmation"
        checkLink="/password"
        checkFunction={confirmCodeHandler}
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
              Please type SMS code
            </div>
          </div>
          <input
            value={confirmationCode}
            onChange={(event) => {
              setConfirmationCode(event.target.value);
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

export default ConfirmationCode;
