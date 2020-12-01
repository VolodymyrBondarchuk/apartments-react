import React from "react";
import "./apartment.css";

const Apartment = ({ownerName, apartmentNumber}) => {
    return (
        <div className="sign-up-apartment-container">
            <div className='sign-up-owner-and-owner-name'>
                <div id="sign-up-owner">Owner</div>
                <div className="sign-up-owner-name">{ownerName}</div>
            </div>
            <div className="sign-up-apartment-number">{apartmentNumber}</div>
        </div>
    );
};

export default Apartment;
