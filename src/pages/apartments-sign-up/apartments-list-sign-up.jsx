import React from "react";
import Header from "../../reusable-components/header/header";
import Apartment from "./apartment";
import "./apartments-list-sign-up.css";
const ApartmentsListSignUp = (props) => {
  const { state } = props?.location;
  props = state;
  console.log(props);
  const apartmentsList = Array.isArray(props) ? props : [];
  return (
    <>
      <div id="apartments-list-container">
        <Header
          title="List of Apartments"
          backLink="/"
          checkLink="/phone-number"
          checkFunction={() => {
            return {
              ownerId: apartmentsList[0].owner_id,
              phoneNumber: props.phoneNumber,
            };
          }}
        />

        <div className='scroll-container' style={{ overflowY: 'scroll', height: 'calc(100vh - 127px)' }}>
            <div id="apartments-list-body">
              {apartmentsList.map((apartment, i) => {
                console.log(apartment);
                return (
                    <>
                  <Apartment
                    key={i}
                    ownerName={apartmentsList.ownerName}
                    apartmentNumber={apartment.number}
                  />
                  <Apartment
                      key={i}
                      ownerName={apartmentsList.ownerName}
                      apartmentNumber={apartment.number}
                  />
                  <Apartment
                      key={i}
                      ownerName={apartmentsList.ownerName}
                      apartmentNumber={apartment.number}
                  />
                  <Apartment
                      key={i}
                      ownerName={apartmentsList.ownerName}
                      apartmentNumber={apartment.number}
                  />
                  <Apartment
                      key={i}
                      ownerName={apartmentsList.ownerName}
                      apartmentNumber={apartment.number}
                  />
                  <Apartment
                      key={i}
                      ownerName={apartmentsList.ownerName}
                      apartmentNumber={apartment.number}
                  />
                        <Apartment
                            key={i}
                            ownerName={apartmentsList.ownerName}
                            apartmentNumber={apartment.number}
                        />
                        <Apartment
                            key={i}
                            ownerName={apartmentsList.ownerName}
                            apartmentNumber={apartment.number}
                        />
                        <Apartment
                            key={i}
                            ownerName={apartmentsList.ownerName}
                            apartmentNumber={apartment.number}
                        />
                        <Apartment
                            key={i}
                            ownerName={apartmentsList.ownerName}
                            apartmentNumber={apartment.number}
                        />
                    </>
                );
              })}
            </div>
        </div>
      </div>
    </>
  );
};
export default ApartmentsListSignUp;
