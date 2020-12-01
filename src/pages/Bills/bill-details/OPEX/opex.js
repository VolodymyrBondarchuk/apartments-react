import React from "react";
import InlineBlock from "../../../../reusable-components/inbline-block/inline-block";
import {Link} from "react-router-dom";
import Cookies from "universal-cookie";
import "./opex.css"
import BackMenu from "../../../../reusable-components/back-menu/back-menu";

const Opex = (props) => {

    const cookies = new Cookies();

    let month = "";
    //let debtMonth = props.debtMonth ? props.debtMonth : "";
    let debtMonth = "январь";
    let servicesItem = "";

    if(props.location.props) {
        month = props.location.props.month ? props.location.props.month : "";
        if(month) {
            cookies.set('opex_selected_month', month, { path: '/' });
        }

        servicesItem = props.location.props.serviceItem ? props.location.props.serviceItem : "";
        //debugger;
        if(servicesItem) {
            cookies.set('services_item', JSON.stringify(servicesItem), { path: '/' });
        }
    } else {
        month = cookies.get('opex_selected_month')? cookies.get('opex_selected_month'):"";
        servicesItem = cookies.get('services_item');
    }

    let amount = servicesItem.amount ? servicesItem.amount : 0;

    const numberWithSpaces = (x) => {
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        return parts.join(".");
    }

    return (
        <>
            <BackMenu backLink='/bill-details'
                      title='OPEX'
                      inbox={true}
            />

            <InlineBlock title='К оплате' subtitle={numberWithSpaces(amount) + ' ₸'} />

            <div className='separator separator-black'>Счета за {month.toLowerCase()}</div>

            <InlineBlock title='Сервисное обслуживание' subtitle={numberWithSpaces(amount) + ' ₸'} />

           {/* <div className='separator separator-red'>Долг за {debtMonth.toLowerCase()}</div>

            <InlineBlock title='Сервисное обслуживание' subtitle='4 700.00 ₸' action='switcher' />*/}

        </>
    )
}

export default Opex;