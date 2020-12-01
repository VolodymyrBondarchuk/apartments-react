import BackMenu from "../../reusable-components/back-menu/back-menu";
import React, {useEffect, useState} from "react";
import InlineBlock from "../../reusable-components/inbline-block/inline-block";
import InvoiceServicesApi from "../../api/invoice-services-api";
import InvoiceUtilitiesApi from "../../api/invoice-utilities-api";
import GetCardByUserApi from "../../api/token-bank-card-api";
import Cookies from "universal-cookie";
import VerticalScroll from "../../reusable-components/vertical-scroll/vertical-scroll";

const CardList = () => {

    const [paymentMethods, setPaymentMethods] = useState([]);

    const cookies = new Cookies();
    let user = cookies.get('user');
    let isUserLoggedIn = false;
    if (user && user.id) {

        isUserLoggedIn = true;
        console.log('User id: ' + user.id);
    }

    cookies.set('check_link', '/cards-list');



    useEffect(async () => {

        let payments = await GetCardByUserApi(user.id);
        setPaymentMethods(payments.data);
    }, []);

    return (
        <>
            <BackMenu backLink='/apartments-list'
                      title='Список карт'
                      nextLink='/add-bank-card'
                      nextSign={<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill="black"/>
                      </svg>
                      }
            />
            <VerticalScroll>
                {paymentMethods.map((item, i) =>
                <InlineBlock key={i}
                             title='Банковская карта'
                             subtitle={item.card_number}
                             radioButton={false}/>
                )}
            </VerticalScroll>
        </>
    )
}

export default CardList;