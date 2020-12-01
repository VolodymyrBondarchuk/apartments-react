import "./credit-card-menu.css";
import {Link} from "react-router-dom";
import React from "react";

const CreditCardMenu = ({title, backLink, inbox}) => {

    let inboxElem = ""
    if(inbox) {
        inboxElem =
            <span className="inbox-icon-span">
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M4.99 3H19C20.1 3 21 3.89 21 5V19C21 20.1 20.1 21 19 21H4.99C3.88 21 3 20.1 3 19L3.01 5C3.01 3.89 3.88 3 4.99 3ZM15 15H19V5H5V15H9C9 16.66 10.35 18 12 18C13.65 18 15 16.66 15 15Z" fill="#333333"/>
                </svg>
            </span>
    }

    return (

        <>
            <div className="top-menu-bar-container">
                <Link to={backLink}>
                    {/* Back Arrow SVG */}
                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0)">
                            <path d="M20.5625 8.75H0.437514C0.175014 8.75 0 8.92501 0 9.18751V15.3125C0 16.5375 0.962514 17.5 2.18749 17.5H18.8125C20.0375 17.5 21 16.5375 21 15.3125V9.18751C21 8.92501 20.825 8.75 20.5625 8.75ZM3.06251 12.25H6.5625C6.825 12.25 7.00001 12.425 7.00001 12.6875C7.00001 12.95 6.825 13.1251 6.5625 13.1251H3.06251C2.80001 13.125 2.625 12.95 2.625 12.6875C2.625 12.425 2.80001 12.25 3.06251 12.25ZM9.1875 14.875H3.06251C2.80001 14.875 2.625 14.7 2.625 14.4375C2.625 14.175 2.80001 14 3.06251 14H9.1875C9.45 14 9.62501 14.175 9.62501 14.4375C9.62501 14.7 9.45 14.875 9.1875 14.875ZM16.625 14.875C16.275 14.875 16.0125 14.7875 15.75 14.6125C15.4875 14.7875 15.225 14.875 14.875 14.875C13.9125 14.875 13.125 14.0875 13.125 13.125C13.125 12.1625 13.9125 11.375 14.875 11.375C15.225 11.375 15.4875 11.4625 15.75 11.6375C16.0125 11.4625 16.275 11.375 16.625 11.375C17.5875 11.375 18.375 12.1625 18.375 13.125C18.375 14.0875 17.5875 14.875 16.625 14.875Z" fill="#173546"/>
                            <path d="M18.8125 3.5H2.18749C0.962514 3.5 0 4.46251 0 5.68753V6.56251C0 6.82501 0.175014 7.00003 0.437514 7.00003H20.5625C20.825 7.00003 21 6.82501 21 6.56251V5.68753C21 4.46251 20.0375 3.5 18.8125 3.5Z" fill="#173546"/>
                        </g>
                        <defs>
                            <clipPath id="clip0">
                                <rect width="21" height="21" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>

                </Link>
                <span className="menu-bar-title">{title}</span>
                {inboxElem}
            </div>
        </>
    )
}

export default CreditCardMenu;