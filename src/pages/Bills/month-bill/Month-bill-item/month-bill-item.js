import {Link, Redirect} from "react-router-dom";
import React, {useState} from "react";
import "./month-bill-item.css";

const MonthBillItem = (props) => {

    const [isRedirect, setIsRedirect] = useState(false)

    const renderRedirect = () => {
        console.log('Is redirect:'+isRedirect)
        if(isRedirect) {
            return <Redirect to={{pathname: "/bill-details", month: props.month, monthNumber: props.monthNumber, apartmentId: props.apartmentId}} />
        }
    }

    const closeSign = (
        <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M8.29165 1.47225L7.5279 0.708496L4.49998 3.73641L1.47206 0.708496L0.708313 1.47225L3.73623 4.50016L0.708313 7.52808L1.47206 8.29183L4.49998 5.26391L7.5279 8.29183L8.29165 7.52808L5.26373 4.50016L8.29165 1.47225Z" fill="#F2F2F2"/>
    </svg>)

    const checkSign = (
        <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.87502 5.75867L1.61627 3.49992L0.847107 4.26367L3.87502 7.29158L10.375 0.791582L9.61127 0.027832L3.87502 5.75867Z" fill="#F2F2F2"/>
    </svg>)

    const noSign = "";

    const img = props.billStatus === 'paid'? <img src={checkSign}/> : <img src={closeSign}/>

    let statusIndicator;
    let description;

    if(props.billStatus === 'paid') {
        statusIndicator =
            <div className='bill-status-indicator blue-circle'>
                {checkSign}
            </div>
        description = 'Полностью погашен';
    } else if(props.billStatus === 'not paid') {
        statusIndicator =
        <div className='bill-status-indicator red-circle'>
            {closeSign}
        </div>
        description = 'Есть задолженость';
    } else if(props.billStatus === 'incomming') {
        statusIndicator =
            <div className='bill-status-indicator'>
                {noSign}
            </div>
        description = 'Счет сформирован';
    }
    return (
        <div className="bill-container">

            <div id="bill-body">
                {renderRedirect()}
                {statusIndicator}

                <div className="month-bill-item-owner-and-ownerName-wrapper">
                    <div className="month-name">{props.month}</div>
                    <div id="bill-status-description"
                         className={`bill-status-description ${props.billStatus === 'not paid' ? 'red':'grey'}`}>
                        {description}
                    </div>
                </div>
                <span className="bill-description-img">
                    {props.billStatus === 'incomming' ? '' :
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M5.00004 1.66699H11.6667L16.6667 6.66699V16.667C16.6667 17.5837 15.9167 18.3337 15 18.3337H4.99171C4.07504 18.3337 3.33337 17.5837 3.33337 16.667V3.33366C3.33337 2.41699 4.08337 1.66699 5.00004 1.66699ZM6.66673 15.0005H13.3334V13.3338H6.66673V15.0005ZM13.3334 11.6667H6.66673V10H13.3334V11.6667ZM10.8334 2.91692V7.50025H15.4167L10.8334 2.91692Z"
                                  fill="#BB6BD9"/>
                        </svg>
                    }
                </span>
                <div className="viewBillDetailsLinkWrapper" onClick={() => setIsRedirect(true)}>
                    <Link>
                        {/*to={{pathname: "/bill-details", month: props.month, monthNumber: props.monthNumber, apartmentId: props.apartmentId}}*/}
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
    )
}

export default MonthBillItem;