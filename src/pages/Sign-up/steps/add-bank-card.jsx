import React, {useEffect, useState} from "react";
import Header from "../../../reusable-components/header/header";

import "../password.css";
import RefundApi from "../../../api/refund-api";
import PayByCardApi from "../../../api/pay-by-card-api";
import TokenSaveApi from "../../../api/token-save-api";
import Cookies from "universal-cookie";
import {Link, useHistory} from 'react-router-dom';

const AddBankCard = (props) => {
    const {state} = props.location;
    props = state;
    console.log(props);
    const [bankCard, setBankCard] = useState();
    const [cvc, setCvc] = useState();
    const [expDate, setExpDate] = useState();
    const [mm, setMm] = useState();
    const [yy, setYy] = useState();
    const [cardHolder, setCardHolder] = useState();
    const [animationStyle, setAnimationStyle] = useState({});
    const [inputBorderStyle, setInputBorderStyle] = useState({});
    const [messageText, setMessageText] = useState('');
    const [messageStyleClass, setMessageStyleClass] = useState('');

    const cookies = new Cookies();
    const history = useHistory();

    let checkLink = '/';
    checkLink = cookies.get('check_link') ? cookies.get('check_link') : checkLink;


    useEffect(() => {

        const script = document.createElement('script');
        script.src = 'https://widget.cloudpayments.ru/bundles/checkout';
        script.async = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, [])



    const showErrorMessage = (message) => {
        console.log(message);
        setMessageText(message);
        setMessageStyleClass('add-card-red')
    }

    const showStatusMessage = (message) => {
        console.log(message);
        setMessageText(message);
        setMessageStyleClass('add-card-green')
    }

    const getCryptogram = () => {
        /* Создание checkout */
        //debugger;

        showStatusMessage('Создаём криптограму...');
        let checkout = new window.cp.Checkout(
            // public id из личного кабинета
            "pk_94cba717a5d5a07c401d535c4f8f0",
            // тег, содержащий поля данных карты
            document.getElementById("paymentFormSample")
        );


        console.log("1. start createCryptogramPacket")
        var result = checkout.createCryptogramPacket();


        if (result.success) {
            // сформирована криптограмма
            console.log("1. success createCryptogramPacket: " + result.packet);
            showStatusMessage('Криптограмма создана');
            return result.packet;
        } else {
            // найдены ошибки в введённых данных, объект `result.messages` формата:
            // { name: "В имени держателя карты слишком много символов", cardNumber: "Неправильный номер карты" }
            // где `name`, `cardNumber` соответствуют значениям атрибутов `<input ... data-cp="cardNumber">`
            for (let msgName in result.messages) {
                console.log("1. failed createCryptogramPacket: " + result.messages[msgName])
            }

            return 'cryptogram generation error';
        }


        return 'cryptogram generation error'
    }

    const maskCardNumber = (bankCard) => {
        bankCard = bankCard.substr(0, 4)+' **** **** '+bankCard.substr(bankCard.length - 4);
        console.log('Masking bank card' + bankCard);
        return bankCard;
    }

    const addCardHandler = async () => {

        //TODO: userId
        //TODO: cryptogram
        //TODO: validate
        let user = cookies.get('user');
        let userId = user.id;
        console.log('User id:' + userId);

        let payload = {
            Amount: 200,
            Currency: 'KZT',
            IpAddress: "109.239.32.160",
            Name: cardHolder,
            //we have hidden from in the end of the function and we get all data from that form
            CardCryptogramPacket: getCryptogram(),
            AccountId: userId,
            Description: 'adding card into user account'
        }

        //send Payment by card

        let response;
        try {
            showStatusMessage('Проводим оплату');
            response = await PayByCardApi(payload);
        } catch (error) {
            //show error message
            console.log('Error payment by card: ' + error.toString());
            showErrorMessage('Оплата не удалась: ' + error.toString())
            return;
        }

        if (response && response.success) {
            showStatusMessage('Оплата успешна');
            let token = response.data.Token;
            let transactionId = response.data.TransactionId;

            let refundResponse;
            try {
                showStatusMessage('Делаем возврат средств');
                refundResponse = await RefundApi({amount: payload.Amount, TransactionId: transactionId})
                showStatusMessage('Возврат средст успешен');
            } catch (error) {
                showErrorMessage('Ошибка возврата ссредств: ' + error.toString())
            }


            let tokenPayload = {
                "user_id": userId,
                "token": token,
                "card_number": maskCardNumber(bankCard)
            }

            let tokenResponse;
            try {
                showStatusMessage('Сохраняем карточку в системе');
                tokenResponse = await TokenSaveApi(tokenPayload);
                showStatusMessage('Карточка успешно сохранена');
                setTimeout(function () {setMessageStyleClass('add-card-hide-message')}, 4000);

                return true;
            } catch (error) {
                showErrorMessage('Не удалось сохранить карточку (токен): ' + error.toString());
                return false;
            }

        } else {
            showErrorMessage('Ошибка добавления карточки: ' + response.errors.toString());
            return false;
        }
        return false;


    };
    return (
        <>
            <Header
                backLink={checkLink}
                title="Credit card "
                checkLink={checkLink}
                checkFunction={addCardHandler}
            />
            <div className="add-card-container">
                <div className={messageStyleClass + ` add-card-message`}>{messageText}</div>
                <div className="add-card-number-body-container">
                    <div className="add-card-body" style={animationStyle}>
                        <div
                            onClick={() => {
                                let newStyles;

                                if (Object.keys(animationStyle).length === 0) {
                                    newStyles = {
                                        transform: "translateY(-20%)",
                                        fontSize: "small",
                                        height: "25px",
                                    };
                                    setAnimationStyle(newStyles);
                                    setInputBorderStyle({
                                        "borderBottom": "1px solid #d6cfcf",
                                    });
                                } else {
                                    setAnimationStyle({});
                                    setInputBorderStyle({});
                                }
                            }}
                        >
                            Card number
                        </div>
                    </div>
                    <input
                        value={bankCard}
                        onChange={(event) => {
                            setBankCard(event.target.value);
                        }}
                        id="data" placeholder='4149 1234 1234 0000'
                        style={inputBorderStyle}
                        type={Object.keys(inputBorderStyle).length ? "text" : "hidden"}
                    />
                </div>

                <div className="add-card-cvc-body-container">
                    <div className="add-card-body" style={animationStyle}>
                        <div className='padding-top-7px'
                             onClick={() => {
                                 let newStyles;

                                 if (Object.keys(animationStyle).length === 0) {
                                     newStyles = {
                                         transform: "translateY(-20%)",
                                         fontSize: "small",
                                         height: "25px",
                                     };
                                     setAnimationStyle(newStyles);
                                     setInputBorderStyle({
                                         "borderBottom": "1px solid #d6cfcf",
                                     });
                                 } else {
                                     setAnimationStyle({});
                                     setInputBorderStyle({});
                                 }
                             }}
                        >
                            CVC
                        </div>
                    </div>
                    <input
                        value={cvc}
                        onChange={(event) => {
                            setCvc(event.target.value);
                        }}
                        id="data" placeholder='123'
                        pattern="[0-9]{3}"
                        style={inputBorderStyle}
                        type={Object.keys(inputBorderStyle).length ? "text" : "hidden"}
                    />
                </div>

                <div className="add-card-exp-date-body-container">
                    <div className="add-card-body" style={animationStyle}>
                        <div className='padding-top-7px'
                             onClick={() => {
                                 let newStyles;

                                 if (Object.keys(animationStyle).length === 0) {
                                     newStyles = {
                                         transform: "translateY(-20%)",
                                         fontSize: "small",
                                         height: "25px",
                                     };
                                     setAnimationStyle(newStyles);
                                     setInputBorderStyle({
                                         "borderBottom": "1px solid #d6cfcf",
                                     });
                                 } else {
                                     setAnimationStyle({});
                                     setInputBorderStyle({});
                                 }
                             }}
                        >
                            Exp. date
                        </div>
                    </div>
                    <input
                        value={expDate}
                        onChange={(event) => {
                            function handleMmYyChange(value) {
                                //debugger
                                let arr = value.split('/');
                                setMm(arr[0])
                                setYy(arr[1])
                            }

                            handleMmYyChange(event.target.value);
                        }}
                        id="data" placeholder='MM/YY'
                        style={inputBorderStyle}
                        type={Object.keys(inputBorderStyle).length ? "text" : "hidden"}
                    />
                </div>

                <div className="add-card-holder-body-container">
                    <div className="add-card-body" style={animationStyle}>
                        <div
                            onClick={() => {
                                let newStyles;

                                if (Object.keys(animationStyle).length === 0) {
                                    newStyles = {
                                        transform: "translateY(-20%)",
                                        fontSize: "small",
                                        height: "25px",
                                    };
                                    setAnimationStyle(newStyles);
                                    setInputBorderStyle({
                                        "borderBottom": "1px solid #d6cfcf",
                                    });
                                } else {
                                    setAnimationStyle({});
                                    setInputBorderStyle({});
                                }
                            }}
                        >
                            Card holder
                        </div>
                    </div>
                    <input
                        value={cardHolder}
                        onChange={(event) => {
                            setCardHolder(event.target.value);
                        }}
                        id="data" placeholder='John Doe'
                        style={inputBorderStyle}
                        type={Object.keys(inputBorderStyle).length ? "text" : "hidden"}
                    />
                </div>

                <div className='add-card-description'>
                    Payment in the amount of 200 tenge will be made from your card, after a while a refund will be made
                </div>

                <Link to='/policy' className='add-card-policy'>
                    Политика конфиденциальности
                </Link>

                <div style={{display: 'none'}}>
                    <form id="paymentFormSample" autoComplete="off" aria-readonly={true}>
                        <input type="text" data-cp="cardNumber" placeholder="5200828282828210" value={bankCard}/>
                        <input type="text" data-cp="expDateMonth" placeholder="02" value={mm}/>
                        <input type="text" data-cp="expDateYear" placeholder="22" value={yy}/>
                        <input type="text" data-cp="cvv" placeholder="020" value={cvc}/>
                        <input type="text" data-cp="name" placeholder="DASTAN ARYNGAZY" value={cardHolder}/>
                        <button>Оплатить 100 р.</button>
                    </form>
                </div>
            </div>


        </>
    );
};
export default AddBankCard;
