import "./App.css";
import Header from "./component/layout/Header/Header.js";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import Contact from "./component/Home/Contact.js";
import RoomDetails from "./component/Room/RoomDetails.js";
import LoginSignup from "./component/User/LoginSignup.js";
import Rooms from "./component/Room/Rooms.js";
import Search from "./component/Room/Search";
import Cart from "./component/Cart/Cart.js";



function App() {
  return (
    <Router>
      <Header />
      <Route exact path="/" component={Home} />
      <Route exact path="/room/:id" component={RoomDetails} />
      <Route exact path="/rooms" component={Rooms} />
      <Route path="/rooms/:keyword" component={Rooms} />
      <Route exact path="/search" component={Search} />
      <Route exact path="/bookings" component={Cart} />
      <Route exact path="/contact" component={Contact} />
      <Route path="/login" component={LoginSignup} />
      <Footer />
    </Router>
  );
}

export default App;
