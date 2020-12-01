import React, {useEffect, useState} from "react";
import MonthBillItem from './Month-bill-item/month-bill-item';
import BackMenu from "../../../reusable-components/back-menu/back-menu";
import Cookies from "universal-cookie";
import {Redirect} from "react-router-dom";
import InvoiceServicesApi from "../../../api/invoice-services-api";
import PreLoader from "../../../reusable-components/pre-loader/pre-loader";
import InvoiceUtilitiesApi from "../../../api/invoice-utilities-api";

const MonthListBills = (props) => {

    const [isLoaded, setIsLoaded] = useState(false);
    const [monthsServices, setMonthsServices] = useState([]);
    const [monthsUtils, setMonthsUtils] = useState([]);
    const [ownerId, setOwnerId] = useState(0);
    const [ownerName, setOwnerName] = useState("unknown");
    const [monthsName, setMonthsName] = useState([
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь"
    ]);
    let apartmentId = props.location.apartment_id ? props.location.apartment_id : 0;

    console.log("Apartment id: "+apartmentId);



    const cookies = new Cookies();
    let user = cookies.get('user');
    let isUserLoggedIn = false;

    if (user && user.id) {
        isUserLoggedIn = true;
    }

    if(apartmentId) {
        cookies.set('apartment_id', apartmentId, { path: '/' });
    } else {
        apartmentId = cookies.get('apartment_id');
    }

    useEffect(async () => {
        let allMonthsServices = await InvoiceServicesApi();
        let allMonthsUtilities = await InvoiceUtilitiesApi();
        console.log("Months bills: "+allMonthsServices.length);

        if(isUserLoggedIn) {
            setOwnerId(user.id);
            setOwnerName(user.name);

            let userBills = allMonthsServices
                .filter(b => b.apartment_id == apartmentId)
                .map(b => (

                    {...b,
                        monthName: getMonthName(b.date_stamp),
                        monthNumber : getMonthNumber(b.date_stamp)}
                    ));
            let userUtilities = allMonthsUtilities
                .filter(b => b.apartment_id == apartmentId
                ).map(b => (
                    {...b,
                        monthName: getMonthName(b.date_stamp),
                        monthNumber : getMonthNumber(b.date_stamp)}
                ));



            userBills = userBills
                .map(b => {
                    let is_open = getUtilsIsOpenByMonthNumber(b.monthNumber, userUtilities);


                    console.log('--------aligning is_open start--------')
                    console.log('apartment_id: ' + b.apartment_id)
                    console.log('Month number: ' + b.monthNumber)
                    console.log('Bills is_open: ' + b.is_open)
                    console.log('Utils is_open: ' + is_open)
                    console.log('--------aligning is_open end--------')

                    if(is_open === false || is_open === true) {
                        b.is_open = b.is_open || is_open
                    }
                    return b

                });



                //debugger;
            userBills.sort(compare);
            setMonthsServices(userBills);
            setIsLoaded(true);
        } else {
            console.log("Error: User is not logged in")
            //show error popup or smth like this
        }

    }, [])

    const getUtilsIsOpenByMonthNumber = (monthNumber, userUtilities) => {
        let is_open;
            userUtilities.filter(u => u.monthNumber == monthNumber)
            .map(u => is_open =  u.is_open)
        return is_open;
    }

    const compare = ( a, b ) => {
        if ( a.monthNumber < b.monthNumber ){
            return -1;
        }
        if ( a.monthNumber > b.monthNumber ){
            return 1;
        }
        return 0;
    }

    const getMonthNumber = (date_stamp) => {
        let d = new Date(date_stamp);
        return d.getMonth();
    }

    const getMonthName = (date_stamp) => {
        let monthNumber = getMonthNumber(date_stamp);
        console.log('date_stamp: '+date_stamp);
        return monthsName[monthNumber];
    }

    const getStatus = (is_open, date_stamp) => {
        let monthNumber = getMonthNumber(date_stamp);
        let now = new Date();
        let currMonthNumber = now.getMonth();

        if(monthNumber >= currMonthNumber) {
            return 'incomming'
        } else {
            return is_open ? 'not paid' : 'paid';
        }

    }


    return (
        <>
            <BackMenu title="Счета на оплату" backLink="/apartments-list"/>
            {/*amount: 25
            apartment_id: 22
            date_stamp: "2019-12-25T00:00:00Z"
            invoice_id: 302
            invoice_type_id: 1
            is_open: true
            payment_offline: 0
            payment_online: 0
            payment_user_balance: 0
            rate: 1
            real_amount: 0
            total_saving: 0*/}
            <div className='scroll-container' style={{ overflowY: 'scroll', height: 'calc(100vh - 127px)' }}>
                {!isUserLoggedIn
                    ? <Redirect to={{pathname: "/"}}/>
                    : (!isLoaded
                        ? <PreLoader title='Загрузка...'/>
                        : monthsServices.map((item) =>{
                    return (
                        console.log('Month number:'+item.date_stamp),
                        console.log('Задолженость:'+item.is_open),

                        <MonthBillItem key={item.date_stamp}
                                       billStatus={getStatus(item.is_open, item.date_stamp)}
                                       month={getMonthName(item.date_stamp)}
                                       monthNumber={getMonthNumber(item.date_stamp)}
                                       apartmentId={item.apartment_id}
                        />
                    )
                } ))}
            </div>


        </>
    )
}

export default MonthListBills;