import React, { useEffect, useState } from "react";
import Header from "../../reusable-components/header/header";
import BurgerMenu from "../../reusable-components/burger-menu/burger-menu";
import Apartment from "./apartment";
import "./apartments-list.css";
import BurgerMenuItem from "../../reusable-components/burger-menu/burger-menu-item/burger-menu-item";
import DefaultUserAvatar from "../../icons/account_circle.svg";
import {Link, Redirect} from "react-router-dom";
import Cookies from 'universal-cookie';
import ApartmentsListApi from '../../api/apartments-api';
import PreLoader from "../../reusable-components/pre-loader/pre-loader";
import CreditCardMenu from "../../reusable-components/credit-card-menu/credit-card-menu";

const ApartmentsList = (props) => {
    const {state} = props?.location;
    props = state;
    console.log(props);

    const [isLoaded, setIsLoaded] = useState(false);
    const [apartmentsList, setApartmentsList] = useState([]);
    const [ownerId, setOwnerId] = useState(0);
    const [ownerName, setOwnerName] = useState("unknown");

    const cookies = new Cookies();
    let user = cookies.get('user');
    let isUserLoggedIn = false;


    if (user && user.id) {
        isUserLoggedIn = true;
    }

    console.log("User is logged in: " + isUserLoggedIn);



    useEffect(async () => {
        let allApartments = await ApartmentsListApi();

        console.log("Apart list: "+ApartmentsListApi());

        if(isUserLoggedIn) {
            setOwnerId(user.id);
            setOwnerName(user.name);
            let userApartments = allApartments.filter(a => a.owner_id == user.id);
            setApartmentsList(userApartments);
            //setApartmentsList(allApartments);
            setIsLoaded(true);
        } else {
            console.log("Error: User is not logged in")
            //show error popup or smth like this
        }

    }, [])


    return (
        <>
            {!isUserLoggedIn
                ? <Redirect to={{pathname: "/"}}/>
                : (

                        <div id="apartments-list-container">
                            <CreditCardMenu title="Список апартаментов" backLink='/cards-list'/>

                            <div className='scroll-container' style={{ overflowY: 'scroll', height: 'calc(100vh - 127px)' }}>
                                {!isLoaded
                                ? <PreLoader title='Loading...'/>
                                :
                                <div id="apartments-list-body">
                                    {apartmentsList.map((apartment, i) => {
                                        console.log(apartment);
                                        return (
                                            <Apartment
                                                key={i}
                                                ownerName={ownerName}
                                                apartmentNumber={apartment.number}
                                                apartmentId={apartment.apartment_id}
                                            />
                                        );
                                    })}
                                </div> }
                            </div>
                    </div>
                )}
        </>

    );
};
export default ApartmentsList;
