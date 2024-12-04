/* eslint-disable no-unused-vars */
import { useState } from 'react';

import './Navbar.css'

import Olx from '../../assets/olx.png';
import arrow from '../../assets/arrow.png';
import lens from '../../assets/lens.png';
import Login from '../../pages/Login/Login'
import { auth } from '../../firebase/setub'
import { signOut } from 'firebase/auth'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// import { useState } from 'react';

const Navbar = () => {


  const [userFunction,setUserFunction] =useState(localStorage.getItem("isUserLogedIn")||"Login");

  const navigate = useNavigate();


  const [loginPop, setLoginPop] = useState(false);

  const handleLoginClick = () => {
    setLoginPop(!loginPop)
    setUserFunction(localStorage.getItem("isUserLogedIn")||"Login")
  }

  const logOut = () => {
    signOut(auth);
    localStorage.setItem("Login")
    setUserFunction("Login")
  }


  const handleUserAction = ()=> {

    if (userFunction === "Login"){
      setLoginPop(!loginPop)
      
    }else{
      signOut(auth);
      localStorage.setItem("isUserLogedIn","Login")
      setUserFunction("Login")
    }
  }

  const sell = () =>{
    if (userFunction == 'Login'){
      console.log(userFunction);
      
      alert('Please log in first before sell !!!')
    } else{
      navigate('/sell')
    }
  }

  return (

    <>
      <div className="second__navbar ">
        <div className="second-navbar__logo">
          <a href="/">
            <img src={Olx} className='olx-logo' />
          </a>
        </div>
        <div className="select_option">
          <img src={lens} alt="" className='lens' />
          <input type="text" placeholder="Jamshed Town, Karachi" />
          <img src={arrow} alt="" className='arrow' />
        </div>
        <div className="search__bar">
          <input type="text" id="txt" placeholder="Find Cars, Mobile Phones and more..." />
          <i className="fa-solid fa-search" ></i>
        </div>

        <button href="" className="eng" >
          English
          <img src={arrow} alt="" />
        </button>

        <button href="" className="login__btn" onClick={handleUserAction}>{userFunction}</button> 
        <button className="sell__btn" onClick={sell}>+ Sell</button>

      </div>

      {loginPop && <Login abc={handleLoginClick} />}
    </>
  );
}

export default Navbar
