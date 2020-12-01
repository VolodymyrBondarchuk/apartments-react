import "./blue-button.css"
import React from "react";

const BlueButton = ({title, toUpperCase, onClick, token}) => {

    let text = title ? title : ""
    return (
        <>
            <div className='blue-btn-border'
                 onClick={() => onClick(token)}>
                {toUpperCase? title.toUpperCase() : title}
            </div>
        </>
    )
}

export default BlueButton