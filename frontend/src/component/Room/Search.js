 import React, { useState, Fragment } from "react";
 import "./Search.css";


 const Search = ({ history }) => {
   const [keyword, setKeyword] = useState("");

   const searchSubmitHandler = (e) => {
     e.preventDefault();
     if (keyword.trim()) {
       history.push(`/rooms/${keyword}`);
     } else {
       history.push("/rooms");
     }
   };

   return (
     <Fragment>
       <form className="searchBox" onSubmit={searchSubmitHandler}>
         <input
           type="text"
           placeholder="Search for a hotel..."
           onChange={(e) => setKeyword(e.target.value)}
         />
        
         <input type="submit" value="SEARCH" />
       </form>
     </Fragment>
   );
 };


 export default Search;
