import "./App.css";
import { useEffect } from "react";
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

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    store.dispatch(loadUser());
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
      <Route path="/bookings" component={Cart} />
      <Route exact path="/contact" component={Contact} />
      <Route path="/login" component={LoginSignup} />
      <ProtectedRoute exact path="/account" component={Profile} />
      <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
      <ProtectedRoute
        exact
        path="/password/update"
        component={UpdatePassword}
      />
      <Route exact path="/password/forgot" component={ForgotPassword} />

      <Route exact path="/password/reset/:token" component={ResetPassword} />

      <Footer />
    </Router>
  );
}

export default App;
