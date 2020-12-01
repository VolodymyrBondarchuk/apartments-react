import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import "./bill-details.css"
import "../../../styles/style.css"
import InlineBlock from "../../../reusable-components/inbline-block/inline-block";
import BlueButton from "../../../reusable-components/blue-button/blue-button";
import Cookies from "universal-cookie";
import BackMenu from "../../../reusable-components/back-menu/back-menu";
import InvoiceServicesApi from "../../../api/invoice-services-api";
import InvoiceUtilitiesApi from "../../../api/invoice-utilities-api";
import GetCardByUserApi from "../../../api/token-bank-card-api";
import PayByTokenApi from "../../../api/pay-by-token-api";
import { PDFDownloadLink, Document, Page } from '@react-pdf/renderer'
import PDFGenerator from "./PDFGenerator/PDFGenerator";
import ManagementCompanyApi from "../../../api/management-company-api";
import ApartmentsListApi from "../../../api/apartments-api";
import Users from "../../../api/users";

const BillDetails = (props) => {

    let month = props.location.month ? props.location.month : "";
    let monthNumber = props.location.monthNumber ? props.location.monthNumber : "";
    let apartmentId = props.location.apartmentId ? props.location.apartmentId : "";
    let paymentMethodType = "";
    if(props.location.state){
        paymentMethodType = props.location.state.paymentMethodType ? props.location.state.paymentMethodType : "";
    }


    const [totalToPay, setTotalToPay] = useState(0);
    const [monthServiceAmount, setMonthServicesAmount] = useState('Загрузка...');
    const [monthUtilsAmount, setMonthUtilsAmount] = useState('Загрузка...');
    const [chosenPaymentMethod, setChosenPaymentMethod] = useState('Загрузка...');
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [paymentToken, setPaymentToken] = useState("");
    const [userBalance, setUserBalance] = useState(0);
    const [fee, setFee] = useState('Загрузка...');
    const [utilsItem, setUtilsItem] = useState({});
    const [serviceItem, setServiceItem] = useState({});
    const [utilsItemIsOpen, setUtilsItemIsOpen] = useState({});
    const [serviceItemIsOpen, setServiceItemIsOpen] = useState({});
    const [payParams, setPayParams] = useState({text: 'Оплатить', toUpperCase: true, handler: {}});
    const [pdfDownloadLinkEnglish, setPdfDownloadLinkEnglish] = useState("");
    const [pdfDownloadLinkRussian, setPdfDownloadLinkRussian] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);


    const cookies = new Cookies();
    if(month) {
        cookies.set('selected_month', month, { path: '/' });
    } else {
        month = cookies.get('selected_month');
    }

    if(apartmentId) {
        cookies.set('apartment_id', apartmentId, { path: '/' });
    } else {
        apartmentId = cookies.get('apartment_id');
    }

    if(paymentMethodType) {
        cookies.set('payment_method', paymentMethodType, { path: '/' });
    } else {
        paymentMethodType = cookies.get('payment_method');
    }

    if(monthNumber) {
        cookies.set('month_number', monthNumber, { path: '/' });
    } else {
        monthNumber = cookies.get('month_number');
    }

    let user = cookies.get('user');
    let isUserLoggedIn = false;

    if (user && user.id) {
        isUserLoggedIn = true;
        console.log('User id: ' + user.id);
    }


    //calculates in the end of component
    let totalAmount2Pay = 0;
    let userServiceItem = {};
    let userUtilsItem = {};

    const handlePayByCardBtn = async (paymentToken) => {
        //debugger
        console.log('Handle Pay by Card Button');
        setPayParams({text: 'Оплачиваем ...', toUpperCase: false, handler: {}});
        let payload = {
            'Amount': totalAmount2Pay,
            'Currency': "RUB",
            'AccountId': user.id,
            'Token': paymentToken ? paymentToken : ""

        }
        let response = "";

        try{
            response = await PayByTokenApi(payload);
            setPayParams({text: 'Оплатили', toUpperCase: false, handler: handlePayByCardBtn});
        } catch (error) {
            setPayParams({text: 'Ошибка при оплате', toUpperCase: false, handler: handlePayByCardBtn});
        }


    }

    const handlePayByUserBalance = (emptyToken) => {
        //debugger
        console.log('Total to Pay: '+totalToPay);
        console.log('User balance: '+userBalance);
        console.log('Utils is Open: '+utilsItemIsOpen);
        console.log('Service is Open: '+serviceItemIsOpen);



            //just to know what should be updated
            if(utilsItemIsOpen && serviceItemIsOpen) {

                let change = userBalance - monthServiceAmount - monthUtilsAmount;
                if(change >= 0) {
                    /*let payOnlineService = monthServiceAmount;
                    let payOnlineUtils = monthUtilsAmount;

                    setUserBalance(change);
                    setTotalToPay(0);*/

                    //save
                    //payOnline
                    //payOffline
                    //total to pay
                    //payment_user_balance

                    //set
                    //is open
                    //is open

                }  else {
                    console.log('Недостаточно средств для оплаты услуг');
                }
            } else if(utilsItemIsOpen) {

            } else if(serviceItemIsOpen) {

            }

        console.log('Handle Pay User Balance Button');
    }

    let downloadLink = "Export PDF of the invoice";

    const pdfLinkGenerator = (invoices, utilsIsOpen, serviceIsOpen, isEnglish) => {
        return (<PDFDownloadLink id="we" key={Math.random()}
                                 document={<PDFGenerator invoices={invoices}
                                                         utilsIsOpen={utilsIsOpen}
                                                         serviceIsOpen={serviceIsOpen}
                                                         english={isEnglish} />}
                                 fileName="invoice.pdf"
                                 style={{
                                     display: "block"
                                     /*textDecoration: "none",
                                     padding: "10px",
                                     color: "#4a4a4a",
                                     backgroundColor: "#f2f2f2",
                                     border: "1px solid #4a4a4a"*/
                                 }}
        >
            {({ blob, url, loading, error }) => {
                downloadLink = url;
                let downloadPdfText;
                if(isEnglish) {
                    downloadPdfText = loading ? "Loading invoice..." : "Export PDF of the invoice"
                } else {
                    downloadPdfText = loading ? "Загрузка счета..." : "Експорт счета в PDF"
                }
                return downloadPdfText;
            }
            }
        </PDFDownloadLink>);
    }

    //populates in the end of the function
    let electricity = 0;
    let coldWater = 0;
    let heating = 0;
    const handlePayOffline = async (emptyToken) => {
        let managmentCompanies = await ManagementCompanyApi();
        let company = managmentCompanies[0] ? managmentCompanies[0] : {};
        let apartmentsList = await ApartmentsListApi();
        let apartment = apartmentsList.filter(a => a.apartment_id == apartmentId);

        let users = await Users();
        let user_gender = users.filter(u => u.personnel_id == user.id);
        //debugger
        user_gender = user_gender[0].gender;
        //apartments api
        //personels api
        console.log('Handle Pay Offline Button');


        let invoice = {
            invoice_id: userServiceItem.invoice_id,
            company_name: company.name,
            company_address: company.address,
            company_phone: company.phone_number,
            bank_name: company.bank_name,

            company_iik: company.iik,
            company_rnn: company.rnn,
            company_bin: company.bin,
            company_bik: company.bik,
            kbe: company.kbe,
            knp: company.knp,

            date_stamp: userServiceItem.date_stamp,

            number: userServiceItem.invoice_id,
            owner_name: user.name,
            gender_number: user_gender,
            owner_bin: user.bin,
            owner_iin: user.iin,
            address: apartment[0].address,
            share: apartment[0].share,
            area: apartment[0].area,
            rate: userServiceItem.rate,
            ex_rate: Math.round(totalAmount2Pay/apartment[0].area*100)/100,

            amount: totalAmount2Pay,
            electricity_amount: electricity,
            cold_water_amount: coldWater,
            heating_amount: heating,

            agreement: user.agreement_code,

        }

        let serviceIsOpen = userServiceItem ? userServiceItem.is_open : false;
        let utilsIsOpen = userUtilsItem ? userUtilsItem.is_open : false;

        //debugger
        //setPdfDownloadLinkEnglish(pdfLinkGenerator([invoice], true))
        setPayParams({
            //link
            text:pdfLinkGenerator([invoice], utilsIsOpen, serviceIsOpen, false),
            toUpperCase: false,
            token: "",
            handler: dummyHandler});
        //setPdfDownloadLinkRussian(pdfLinkGenerator([invoice], utilsIsOpen, serviceIsOpen, false))
    }

    const dummyHandler = (emptyToken) => {

    }

    useEffect(async () => {


        if(isUserLoggedIn) {
            let allMonthsServices = await InvoiceServicesApi();
            let allMonthsUtilities = await InvoiceUtilitiesApi();

            let paymentType = paymentMethodType;

            let payments = await GetCardByUserApi(user.id);
            setPaymentMethods(payments.data);

            //debugger;
            if(!paymentMethodType) {
                paymentType = payments.data[0] ? payments.data[0].card_number : 'Карта не найдена';
                setChosenPaymentMethod(paymentType);

            }

            let userServices = allMonthsServices
                .filter(b =>
                    b.apartment_id == apartmentId
                    && getMonthNumber(b.date_stamp) == monthNumber);
            let userUtilities = allMonthsUtilities
                .filter(b =>
                    b.apartment_id == apartmentId
                    && getMonthNumber(b.date_stamp) == monthNumber);


            let servicesAmount = userServices[0] ? userServices[0].amount : 0;
            let servicesIsOpen = userServices[0] ? userServices[0].is_open : false;

            let utilsAmount = userUtilities[0] ? userUtilities[0].amount : 0;
            let utilsIsOpen = userUtilities[0] ? userUtilities[0].is_open : false;

            let balance = userUtilities[0] ? userUtilities[0].payment_user_balance : 0;

            let sum = 0;
            if(servicesIsOpen) {
                sum =+ servicesAmount;
            }
            if(utilsIsOpen) {
                sum =+ utilsAmount;
            }

            let fii = 0;


            if(sum < 1000000) {
                fii = Math.round(sum * 0.007*100)/100;
                setFee(fii)
            } else if(sum >= 1000000 && sum < 3000000 ){
                fii = Math.round(sum * 0.005*100)/100;
                setFee(fii)
            } else if(sum >= 3000000 && sum < 5000000) {
                fii = Math.round(sum * 0.003*100)/100;
                setFee(fii)
            } else if(sum >= 5000000) {
                fii = Math.round(sum * 0.002*100)/100;
                setFee(fii)
            }


            //debugger
            setPayParams({text:'Оплатить', toUpperCase: true, token: paymentType.token, handler: handlePayByCardBtn});
            if(paymentType.type === 'bank_card'){
                setChosenPaymentMethod(paymentType.card_number);
                setPaymentToken(paymentType.token);

                setPayParams({text:'Оплатить', toUpperCase: true, token: paymentType.token, handler: handlePayByCardBtn});

            } else if(paymentType.type === 'user_balance') {
                setChosenPaymentMethod('Баланс апартаментов '+paymentType.value+' ₸');

                setPayParams({text:'Оплатить', toUpperCase: true, token:"", handler: handlePayByUserBalance});

            } else if(paymentType.type === 'offline_payment') {
                setChosenPaymentMethod('Оплатить в банке');
                setPayParams({text:'Скачать счета на оплату', toUpperCase: false, token: "", handler: handlePayOffline});
            }
            setMonthServicesAmount(servicesAmount);
            setMonthUtilsAmount(utilsAmount);


            setUtilsItem(userUtilities[0] ? userUtilities[0] : {});
            setServiceItem(userServices[0] ? userServices[0] : {});
            setUserBalance(balance);

            setUserBalance(1500000);
            userServiceItem = userServices[0];
            userUtilsItem = userUtilities[0];

            setServiceItemIsOpen(userServiceItem ? userServiceItem.is_open : false);
            setUtilsItemIsOpen(userUtilsItem ? userUtilsItem.is_open : false);


            totalAmount2Pay = Math.round((sum + fii) *100)/100;

            setTotalToPay(totalAmount2Pay);

            electricity = userUtilities[0]? userUtilities[0].electricity_amount : 0;
            coldWater = userUtilities[0] ? userUtilities[0].cold_water_amount : 0;
            heating = userUtilities[0] ? userUtilities[0].heating_amount : 0;


            setIsLoaded(true);
        } else {
            console.log("Error: User is not logged in")
            //show error popup or smth like this
        }

    }, [])

    const getMonthNumber = (date_stamp) => {
        let d = new Date(date_stamp);
        return d.getMonth();
    }

    const numberWithSpaces = (x) => {
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        return parts.join(".");
    }


    return (
        <>
            <BackMenu backLink='/bills'
                      title={'Счета за ' + month.toLowerCase()}
                      inbox={true}
            />

            {console.log('Ком услуги: '+monthUtilsAmount)}
            {console.log('Opex: '+monthServiceAmount)}
            <div className='scroll-container' style={{ overflowY: 'scroll', height: 'calc(100vh - 127px)' }}>
                <InlineBlock title='Комунальные услуги'
                             subtitle={numberWithSpaces(monthUtilsAmount) + ' ₸'}
                             redirectTo='/utilities'
                             redirectParams={{month:month, utilsItem: utilsItem}}/>

                <InlineBlock title='OPEX'
                             subtitle={numberWithSpaces(monthServiceAmount) + ' ₸'}
                             redirectTo='/opex'
                             redirectParams={{month:month, serviceItem: serviceItem}}/>

                <InlineBlock title='Выберите способ оплаты'
                             subtitle={chosenPaymentMethod}
                             action='arrow'
                             redirectTo='/choose-payment-method'
                             redirectParams={{
                                 month:month,
                                 paymentMethods: paymentMethods,
                                 userBalance: userBalance,
                                 total2Pay: totalToPay}}/>

                <InlineBlock title='Комиссия' subtitle={numberWithSpaces(fee) + ' ₸'} action='info' />
                <InlineBlock title='К оплате' subtitle={numberWithSpaces(totalToPay) + ' ₸'} />

                <div className="btn-container">
                    <BlueButton title={payParams.text}
                                toUpperCase={payParams.toUpperCase}
                                onClick={payParams.handler}
                                token={payParams.token}/>
                   {/* {pdfDownloadLinkRussian}
                    {pdfDownloadLinkEnglish}*/}
                </div>
            </div>
        </>
    )
}

export default BillDetails