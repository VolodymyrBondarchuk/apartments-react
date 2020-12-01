import "./burger-menu.css";
import {useState} from "react";
import BurgerMenuItem from "./burger-menu-item/burger-menu-item";

const BurgerMenu = (props) => {

    const [menuActive, setMenuActive] = useState(false);
    const title = props.title;

    const toogleMenu = () => {
        setMenuActive(!menuActive);
        console.log("BackMenu active: "+menuActive)
    }

    return (

        <>
            <div className={`menu-list-container-background ${menuActive ? 'active' : 'hidden'}`}
            onClick={toogleMenu}/>
            <div className="top-menu-bar-container">
                <span className='top-burger-icon' onClick={toogleMenu}>
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd"
                              clipRule="evenodd" d="M3 8V6H21V8H3ZM3 13H21V11H3V13ZM3 18H21V16H3V18Z"
                              fill="#333333"/>
                    </svg>
                </span>

                <span className="menu-bar-title">{title}</span>
            </div>



            <div className={`menu-list-container ${menuActive ? 'active' : 'hidden'}`}>
                {props.children}
            </div>

        </>
    )
}

export default BurgerMenu;