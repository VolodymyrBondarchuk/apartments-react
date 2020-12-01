import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import "./header.css";
const Header = ({ title, backLink, checkLink, checkFunction }) => {
  const [redirect, setRedirect] = useState(false);
  const [redirectProps, setRedirectProps] = useState("");

  return (
    <>
      {redirect === true ? (
        <Redirect to={{ pathname: checkLink, state: redirectProps }} />
      ) : (
        <div id="header">
          <div>
            <Link to={backLink}>
              {/* Back Arrow SVG */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 7H3.83L9.42 1.41L8 0L0 8L8 16L9.41 14.59L3.83 9H16V7Z"
                  fill="#333333"
                />
              </svg>
            </Link>
          </div>
          <div>{title}</div>
          <div>
            {/* Check SVG */}
            <svg
              onClick={async () => {
                let res = await checkFunction();
                if (res) {
                  console.log(res);
                  setRedirectProps(res);
                  setRedirect(true);
                }
                console.log("not redirecting");
              }}
              width="18"
              height="14"
              viewBox="0 0 18 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.00002 11.2L1.80002 6.99998L0.400024 8.39998L6.00002 14L18 1.99998L16.6 0.599976L6.00002 11.2Z"
                fill="#333333"
              />
            </svg>
          </div>
        </div>
      )}
    </>
  );
};
export default Header;
