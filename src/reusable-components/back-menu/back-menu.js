import "./back-menu.css";
import leftArrow from '../../icons/left-arrow.svg';
import {Link, Redirect} from "react-router-dom";
import React, {useState} from "react";

const BackMenu = ({title, backLink, inbox, nextLink, nextSign}) => {

    const [isRedirect, setIsRedirect] = useState(false)

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

    let nextElem = ""
    if(nextSign) {
        nextElem =
            <span className="plus-icon-span">
                <Link to={nextLink}>
                    {nextSign}
                </Link>
            </span>
    }

    const renderRedirect = () => {
        console.log('Is redirect:'+isRedirect)
        if(isRedirect) {
            return <Redirect to={backLink} />
        }
    }

    return (

        <>
            {renderRedirect()}
            <div className="top-menu-bar-container">
                <span className='back-link-container' >
                    {/*onClick={() => setIsRedirect(true)}*/}
                    <Link to={backLink}>

                        {/* Back Arrow SVG */}
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 7H3.83L9.42 1.41L8 0L0 8L8 16L9.41 14.59L3.83 9H16V7Z"
                                  fill="#333333"/>
                        </svg>

                    </Link>
                </span>
                <span className="menu-bar-title">{title}</span>
                {inboxElem}
                {nextElem}
            </div>
        </>
    )
}

export default BackMenu;