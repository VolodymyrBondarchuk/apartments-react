import React from "react";
import InlineBlock from "../../../../reusable-components/inbline-block/inline-block";
import {Link} from "react-router-dom";
import Cookies from "universal-cookie";
import "./utilities.css"
import BackMenu from "../../../../reusable-components/back-menu/back-menu";

const Utilities = (props) => {

    const cookies = new Cookies();

    let month = "";
    let utilsItem = "";
    //let debtMonth = props.debtMonth ? props.debtMonth : "";
    let debtMonth = "январь";

    if(props.location.props) {
        month = props.location.props.month ? props.location.props.month : "";
        if(month) {
            cookies.set('utilities_selected_month', month, { path: '/' });
        }

        utilsItem = props.location.props.utilsItem ? props.location.props.utilsItem : "";
        if(utilsItem) {
            cookies.set('utils_item', JSON.stringify(utilsItem), { path: '/' });
        }
    } else {
        month = cookies.get('utilities_selected_month')? cookies.get('utilities_selected_month'):"";
        utilsItem = cookies.get('utils_item');
    }

    let amount = utilsItem.amount ? utilsItem.amount : 0;
    let cold_water_amount = utilsItem.cold_water_amount ? utilsItem.cold_water_amount : 0;
    let heating_amount = utilsItem.heating_amount ? utilsItem.heating_amount : 0;
    let electricity_amount = utilsItem.electricity_amount ? utilsItem.electricity_amount : 0;

    const numberWithSpaces = (x) => {
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        return parts.join(".");
    }

    return (
        <>
            <BackMenu backLink='/bill-details'
                      title='Комунальные услуги'
                      inbox={true}
            />

            <InlineBlock title='К оплате' subtitle={numberWithSpaces(amount) + ' ₸'} />

            <div className='separator black'>Счета за {month.toLowerCase()}</div>

            <InlineBlock title='Холодная вода' subtitle={numberWithSpaces(cold_water_amount) + ' ₸'} />
            <InlineBlock title='Электричество' subtitle={numberWithSpaces(electricity_amount) + ' ₸'} />
            <InlineBlock title='Отопление' subtitle={numberWithSpaces(heating_amount) + ' ₸'} />

            {/*<div className='separator red'>Долг за {debtMonth.toLowerCase()}</div>

            <InlineBlock title='Холодная вода' subtitle='3 700.00 ₸' action='switcher' />
            <InlineBlock title='Электричество' subtitle='4 500.00 ₸' action='switcher' />
            <InlineBlock title='Отопление' subtitle='10 000.00 ₸' action='switcher' />*/}

        </>
    )
}

export default Utilities;