import React, {useState} from "react";
import "./apartment.css";
import {Link, Redirect} from "react-router-dom";

const Apartment = ({ownerName, apartmentNumber, apartmentId}) => {

    const [isRedirect, setIsRedirect] = useState(false)

    const renderRedirect = () => {
        console.log('Is redirect:'+isRedirect)
        if(isRedirect) {
            return <Redirect to={{pathname: "/bills", apartment_id: apartmentId}} />
        }
    }

    return (
        <div className="apartment-container">
            {renderRedirect()}
            <div id="apartment-body">
                <div className="apartment-number">{apartmentNumber}</div>
                <div className="owner-and-ownerName-wrapper">
                    <div id="owner">Владелец</div>
                    <div className="owner-name">{ownerName}</div>
                </div>
                <div className="viewBillsLinkWrapper" onClick={() => setIsRedirect(true)}>
                    <Link>
                        {/*to={{pathname: "/bills", apartment_id: apartmentId}}>*/}
                        {/* Back Arrow SVG */}
                        <svg
                            width="10"
                            height="17"
                            viewBox="0 0 10 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M0.137928 14.9362L1.54709 16.3374L9.37668 8.4999L1.53918 0.662403L0.137927 2.06365L6.57418 8.4999L0.137928 14.9362Z"
                                fill="#333333"/>
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Apartment;
