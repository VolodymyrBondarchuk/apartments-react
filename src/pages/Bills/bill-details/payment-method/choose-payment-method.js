import React from "react";
import InlineBlock from "../../../../reusable-components/inbline-block/inline-block";
import {Link} from "react-router-dom";
import Cookies from "universal-cookie";
import "./choose-payment-method.css"
import BackMenu from "../../../../reusable-components/back-menu/back-menu";

const ChoosePaymentMethod = (props) => {

    const cookies = new Cookies();

    let month = "";
    let paymentMethods = "";
    let userBalance = "";
    let total2Pay = "";
    //let debtMonth = props.debtMonth ? props.debtMonth : "";
    let debtMonth = "январь";


    if(props.location.props) {
        month = props.location.props.month ? props.location.props.month : "";
        if(month) {
            cookies.set('opex_selected_month', month, { path: '/' });
        }
        paymentMethods = props.location.props.paymentMethods;

        if(paymentMethods) {
            cookies.set('payment_methods', paymentMethods, { path: '/' });
        }
        userBalance = props.location.props.userBalance ? props.location.props.userBalance : 0;
        cookies.set('user_balance', userBalance, { path: '/' });

        total2Pay = props.location.props.total2Pay ? props.location.props.total2Pay : 0;
        cookies.set('total_2_pay', total2Pay, { path: '/' });

    } else {
        month = cookies.get('opex_selected_month')? cookies.get('opex_selected_month'):"";
        paymentMethods = cookies.get('payment_methods')? cookies.get('payment_methods'):"";
        userBalance = cookies.get('user_balance')? cookies.get('user_balance'):"";
        total2Pay = cookies.get('total_2_pay')? cookies.get('total_2_pay'):"";

    }

    paymentMethods && paymentMethods.length>0  ? console.log('paymentMethods is not empty') : console.log('paymentMethods is empty')



    return (
        <>
            <BackMenu backLink='/bill-details'
                      title='Способ оплаты'
                      inbox={true}
            />


            <div className='scroll-container' style={{ overflowY: 'scroll', height: 'calc(100vh - 127px)' }}>
                {paymentMethods && paymentMethods.length>0
                    ? paymentMethods.map((item, i) =>
                        <InlineBlock key={i}
                                     title='Банковская карта'
                                     subtitle={item.card_number}
                                     redirectTo="/bill-details"
                                     redirectParams={{paymentMethodType:{type:'bank_card',
                                             card_number:item.card_number,
                                             token:item.token}}}
                                     radioButton={true}/>
                    ) :
                    <InlineBlock title='Банковская карта'
                                 subtitle='Не найдена'
                                 radioButton={true}
                                 disabled={true}/>
                }
                <InlineBlock title='Баланс апартаментов'
                             subtitle={userBalance + ' ₸'}
                             redirectTo="/bill-details"
                             redirectParams={{paymentMethodType:{type:'user_balance', value:userBalance}}}
                             radioButton={true}
                             disabled={userBalance == 0 || userBalance < total2Pay || total2Pay == 0}/>
                {/*<InlineBlock title='Бесконтактная оплата' subtitle='Apple Pay' radioButton={true} />
                <InlineBlock title='Бесконтактная оплата' subtitle='Google Pay' radioButton={true} />*/}
                <InlineBlock title='Касовая операция'
                             subtitle='Оплатить в банке'
                             redirectTo="/bill-details"
                             redirectParams={{paymentMethodType:{type:'offline_payment'}}}
                             radioButton={true}/>

            </div>

        </>
    )
}

export default ChoosePaymentMethod;