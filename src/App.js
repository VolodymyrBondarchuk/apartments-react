import "./App.css";
import { Switch, Route } from "react-router";
import Login from "./pages/Login/login";
import SignUp from "./pages/Sign-up/steps/sign-up";
import PhoneNumber from "./pages/Sign-up/steps/phone-number";
import ConfirmationCode from "./pages/Sign-up/steps/confirmation-code";
import Password from "./pages/Sign-up/password";
import ApartmentsList from "./pages/apartments-signed-in/apartments-list";
import MonthListBills from "./pages/Bills/month-bill/month-list-bills";
import ForgotPassword from "./pages/Forgot-password/forgot-password";
import ForgotPasswordConfirmCode from "./pages/Forgot-password/forgot-password-confirm-code";
import ResetPassword from "./pages/Forgot-password/reset-password";
import BillDetails from "./pages/Bills/bill-details/bill-details";
import ApartmentsListSignUp from "./pages/apartments-sign-up/apartments-list-sign-up";
import Utilities from "./pages/Bills/bill-details/utilities/utilities";
import Opex from "./pages/Bills/bill-details/OPEX/opex";
import ChoosePaymentMethod from "./pages/Bills/bill-details/payment-method/choose-payment-method";
import AddBankCard from "./pages/Sign-up/steps/add-bank-card";
import MobileDeviceOnly from "./reusable-components/HOC/mobile-device-only/mobile-device-only";
import React from "react";
import 'typeface-roboto';
import CardList from "./pages/Card-list/card-list";
import Policy from "./pages/Policy/policy";

function App() {
  let app;
  app = (
    <>
      <Switch>
       <MobileDeviceOnly>
          <Route exact path="/" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/apartments-list" component={ApartmentsList} />
          <Route exact path="/cards-list" component={CardList} />
          <Route exact path="/apartments-list-signup" component={ApartmentsListSignUp} />
          <Route exact path="/bills" component={MonthListBills} />
          <Route exact path="/bill-details" component={BillDetails} />
          <Route exact path="/utilities" component={Utilities} />
          <Route exact path="/opex" component={Opex} />
          <Route exact path="/choose-payment-method" component={ChoosePaymentMethod} />
          <Route exact path="/phone-number" component={PhoneNumber} />
          <Route exact path="/confirmation-code" component={ConfirmationCode} />
          <Route exact path="/password" component={Password} />
          <Route exact path="/add-bank-card" component={AddBankCard} />
          <Route exact path="/policy" component={Policy} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route
            exact
            path="/forgot-password-confirm-code"
            component={ForgotPasswordConfirmCode}
          />
          <Route exact path="/reset-password" component={ResetPassword} />
       </MobileDeviceOnly>
      </Switch>
    </>
  );
  return <div>{app}</div>;
}

export default App;
