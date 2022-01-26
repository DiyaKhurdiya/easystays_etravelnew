import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header id="header">
      <div>
        <a href="\" className="brand">
          EasyStays.com
        </a>
      </div>
      <div>
        <a href="\" className="category">
          Home
        </a>
        <a href="\rooms" className="category">
          Hotels
        </a>
        <a href="\attractions" className="category">
          Attractions
        </a>
        <a href="\contact" className="category">
          Contact
        </a>
      </div>
      <div>
        <a className="search-btn" href="\search">
          <i className="fa fa-search" aria-hidden="true"></i>
        </a>
        <a className="bookings-btn" href="\bookings">
          <i className="far fa-calendar-alt" aria-hidden="true"></i>
        </a>
        <a className="user-btn" href="\login">
          <i className="fa fa-user" aria-hidden="true"></i>
        </a>
      </div>
    </header>
  );
};

export default Header;
