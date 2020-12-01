import "./burger-menu-item.css";
import React from "react";

const BurgerMenuItem = ({title, imgUrl, addImg, redirectTo}) => {

    let img = addImg ? <img className="menu-item-img" src={imgUrl} /> : "";

    return (
        <>
            <div className={`menu-item-container ${img ? 'img-active-container' : ''}`}>
                {img}
                <span className={`menu-item-span ${img ? 'img-active-span' : ''}`}>{title}</span>
            </div>
        </>
    )
}

export default BurgerMenuItem;