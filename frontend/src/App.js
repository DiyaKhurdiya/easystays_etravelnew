import "./App.css";
import { useEffect, useState } from "react";
import Header from "./component/layout/Header/Header.js";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import Contact from "./component/Home/Contact.js";
import RoomDetails from "./component/Room/RoomDetails.js";
import LoginSignup from "./component/User/LoginSignup.js";
import Rooms from "./component/Room/Rooms.js";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile.js";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile.js";
import Search from "./component/Room/Search";
import Cart from "./component/Cart/Cart.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js"
import axios from "axios";
import Payment from "./component/Cart/Payment.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import BookingSuccess from "./component/Cart/BookingSuccess.js";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}

      <Route exact path="/" component={Home} />
      <Route exact path="/room/:id" component={RoomDetails} />
      <Route exact path="/rooms" component={Rooms} />
      <Route path="/rooms/:keyword" component={Rooms} />
      <Route path="/room/:id/:fromdate/:todate" component={RoomDetails} />
      <Route exact path="/search" component={Search} />
      <Route exact path="/wishlist" component={Cart} />
      <Route exact path="/contact" component={Contact} />
      <Route exact path="/login" component={LoginSignup} />
      <ProtectedRoute exact path="/account" component={Profile} />
      <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
      <ProtectedRoute
        exact
        path="/password/update"
        component={UpdatePassword}
      />
      <Route exact path="/password/forgot" component={ForgotPassword} />

      <Route exact path="/password/reset/:token" component={ResetPassword} />

      <ProtectedRoute exact path="/shipping" component={Shipping} />
      <ProtectedRoute exact path="/booking/confirm" component={ConfirmOrder} />
      <ProtectedRoute exact path="/success" component={BookingSuccess} />

      {stripeApiKey && (
      <Elements stripe={loadStripe(stripeApiKey)}>
        <ProtectedRoute exact path="/process/payment" component={Payment} />
      </Elements>)}

      <Footer />
    </Router>
  );
}

export default App;
