import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";

const Header = () => {
  const [user, loading, error] = useAuthState(auth);
  const { myTheme, changeTheme } = useContext(ThemeContext);
  return (
    <>
      <header className="hide-when-mobile">
        <Link to="/"> <h1>Courses 4 Arab</h1> </Link>

        <div onClick={() => {
          changeTheme(myTheme === "Dark" ? "Light" : "Dark")
        }} className="iconTheme">
          <i className="fa-solid fa-sun"></i>
          <i className="fa-solid fa-moon"></i>
        </div>
        <ul className="flex">
              {user && (
            <li onClick={() => {
              signOut(auth).then(() => {
  // Sign-out successful.
  console.log("Sign-out successful");
}).catch((error) => {
  // An error happened.
});
            }} className="main-list">
              <NavLink className="main-link">
                Sign out
              </NavLink>
            </li>
          )} 

          {!user && (
            <li className="main-list">
              <NavLink className="main-link" to="/signup">
                Sign up
              </NavLink>
            </li>
          )}
          {!user && (
            <li className="main-list">
              <NavLink className="main-link" to="/signin">
                Sign in
              </NavLink>
            </li>
          )}

          {user && (
            <li className="main-list">
              <NavLink className="main-link" to="/Profile">
                Profile
              </NavLink>
            </li>
          )}
          {user && (
            <li className="main-list">
              <NavLink className="main-link" to="/about">
                About
              </NavLink>
            </li>
          )}
          {user && (
            <li className="main-list">
              <NavLink className="main-link" to="/contactus">
                Contact Us
              </NavLink>
            </li>
          )}
        </ul>
      </header>

    <header className="show-when-mobile">
    <Link to="/"> <h1>Courses 4 Arab</h1> </Link>
    <label className="absolute" htmlFor="burger">
      <i className="fas fa-bars" />
    </label>
    <input id="burger" type="checkbox" />
    <div className="show-on-click">
      <div className="main-div">
        <label htmlFor="html">
          <NavLink to="/Profile"> Profile <i className="fas fa-plus" />  </NavLink>
          
        </label>
        <input id="html" type="checkbox" />
    
      </div>
      <div className="main-div">
        <label htmlFor="css">
          <NavLink to="/about"> About<i className="fas fa-plus" />  </NavLink>
          
        </label>
        <input id="css" type="checkbox" />
      
      </div>
      <div className="main-div">
        <label htmlFor="js">
          <NavLink to="/contactus"> Contact Us <i className="fas fa-plus" /> </NavLink>
          
        </label>
        <input id="js" type="checkbox" />
      
      </div>
    </div>
  </header> 
    </>
  );
};

export default Header;
