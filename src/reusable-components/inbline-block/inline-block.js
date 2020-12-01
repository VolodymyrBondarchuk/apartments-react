import "./inline-block.css"
import {Link, Redirect} from "react-router-dom";
import React, {useState} from "react";
import Switch from '@material-ui/core/Switch';
import Radio from '@material-ui/core/Radio';
import { useHistory } from 'react-router-dom';

const InlineBlock = (props) => {

    const [isRedirect, setIsRedirect] = useState(false)

    const history = useHistory();
    let actionElement = "";
    let radioBtn = "";

    if(props.action === 'arrow') {
        actionElement = <Link
            to={{
                pathname: props.redirectTo,
                props: props.redirectParams
            }}
            className="rightArrow">
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
    } else if(props.action === 'switcher') {
        actionElement = <Switch className="switcher" color="primary"/>
    } else if(props.action === 'info') {
        actionElement = <Link to={{pathname: props.redirectTo}} className="infoIcon">
            {/* Back Arrow SVG */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12ZM13 11V17H11V11H13ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM13 7V9H11V7H13Z" fill="#BDBDBD"/>
            </svg>

        </Link>
    }

    const handleRadioBtnClick = () => {

        setTimeout(
            history.push(props.redirectTo, props.redirectParams),1000);

    }

    if(props.radioButton) {
        radioBtn = <Radio disabled={props.disabled} onClick={handleRadioBtnClick} className='inline-block-radio-btn'/>
    }

    const renderRedirect = () => {
        console.log('Is redirect:'+isRedirect)
        if(isRedirect) {
            return <Redirect to={{
                pathname: props.redirectTo,
                props: props.redirectParams
            }} />
        }
    }

    return (
        <>
            <div className="inline-block-container">
                {renderRedirect()}
                <div id="inline-block-body">

                    {radioBtn}
                    <div className="title-subtitle-wrapper">
                        <div className="title">{props.title}</div>
                        <div className="subtitle">
                            {props.subtitle}
                        </div>
                    </div>

                    <div className="viewDetailsLinkWrapper" onClick={() => setIsRedirect(true)}>
                        {actionElement}
                    </div>
                </div>
            </div>
        </>
    )
}

export default InlineBlock