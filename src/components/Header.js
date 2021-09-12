import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import vectorLogo from '../images/vector-title-logo.svg';

const Header = ({ loggedIn,handleLogout, accountState }) => {
  const [signUpClicked, setSignUpClicked] = useState(false);

  function handleClick() {
    setSignUpClicked(!signUpClicked);
  }

  return (
    <header className="header">
      <img className="header__vector-logo" src={vectorLogo} alt="logo titled 'Around the U.S.'"/>
      {!loggedIn ?
      <NavLink 
        to={accountState==='Log in'?'/signin':'/signup'} 
        className="header__account-state hover-effect" 
        onClick={handleClick}
      >
        {accountState}
      </NavLink>
      :
      <div className="header__account-info">
        <p className="header__account-email">email@mail.com</p>
        <NavLink 
          to={"/signin"} 
          className="header__account-state hover-effect" 
          onClick={handleLogout}
        >
        Log out
        </NavLink>
      </div>
      }
    </header>
  );
}// !loggedIn&&NavLink   loggedIn&&<div><.data.email<NavLink to=signOut></>..></div>

export default Header;