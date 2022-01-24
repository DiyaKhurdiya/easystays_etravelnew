import React from "react";
import "./Footer.css";

/** Fix footer position and sizing in css */
/** Add social media icons for leftFooter */

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>Our social media:</h4>
        <p>INSTAGRAM: @easystays</p>
        <p>TWITTER: @easystays</p>
        <p>VSCO: @easystays</p>
        <p>LINKEDIN: EasyStays Co.</p>
      </div>
      <div className="midFooter">
        <h1>EasyStays.com</h1>
        <h4>Accomodating happiness since 2011</h4>
        <p>Copyrights 2021 &copy; EasyStays</p>
      </div>
      <div className="rightFooter">
        <h4>Contact us!</h4>
        <p>EMAIL: easystays@gmail.com</p>
        <p>TELEPHONE: +1 412-278-5539</p>
        <p>LOCATION: 1730 Cameo St</p>
        <p>Hartsville, South Carolina (SC),</p>
      </div>
    </footer>
  );
};

export default Footer;
