import React, { useState } from "react";
import Header from "../../../reusable-components/header/header";
import apartmentsByInvitaionCode from "../../../api/invitation-code";
import { getAllPersonnels } from "../../../api/personnel";
import Cookies from "universal-cookie";

const Signup = (props) => {
  const [invitationCode, setInvitationCode] = useState("");
  const [animationStyle, setAnimationStyle] = useState({});
  const [inputBorderStyle, setInputBorderStyle] = useState({});

  const apartmentsByInvitaionCodeHandler = async () => {
    let apartments = await apartmentsByInvitaionCode(invitationCode);
    let ownerId = apartments.data[0].owner_id;
    let personnels = await getAllPersonnels();
    let personnel = personnels.find(
      (personnel) => personnel.personnel_id === ownerId
    );

    const cookies = new Cookies();
    cookies.set('owner', JSON.stringify(personnel), { path: '/' });

    apartments.data.ownerName = personnel.name;
    apartments.data.phoneNumber = personnel.phone;
    console.log(apartments.data);
    if (apartments.success) {
      return apartments.data;
    }
    return false;
  };

  return (
    <>
      <Header
        backLink=""
        title="Sign Up"
        checkLink="/apartments-list-signup"
        checkFunction={apartmentsByInvitaionCodeHandler}
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
              Please enter invitation code
            </div>
          </div>
          <input
            value={invitationCode}
            onChange={(event) => {
              setInvitationCode(event.target.value);
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

export default Signup;
