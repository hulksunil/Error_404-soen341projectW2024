import React, { useState, useEffect } from 'react'
import './navbar.css'
import { Link } from 'react-router-dom'
import { clearCookies, getCookie, storeCookies } from '../../utils/CookieManager.ts'
import LogIn from '../../pages/LogIn.tsx'
import CreateUser from '../../pages/CreateUser.tsx'
import axios from 'axios'
import Carslogo from '../Navbar/carsruslogo2.png'
// import AdminManagement from "../../AdminManagement.tsx"

function Navbar () {
  const [createUserModal, setCreateUserModal] = useState(false)
  const [loginModal, setLoginModal] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isCSR, setIsCSR] = useState(false)
  const [userInfo, setUserInfo] = useState({})

  /*
  accType, email, firstName,hashedPass,lastName,__v,_id
  */

  function toggleCreateUserModal () {
    if (!isLoggedIn) {
      setCreateUserModal(!createUserModal)
    }
  }

  function toggleLoginModal () {
    setLoginModal(!loginModal)
  }

  useEffect(() => {
    const userid = getCookie('userid')

    if (userid) {
      // checkn the database if the user is valid
      axios.post('http://localhost:8080/users/' + userid)
        .then((res) => {
          if (res.status === 200) {
            setUserInfo(res.data)

            storeCookies('username', res.data.firstName + ' ' + res.data.lastName)
            storeCookies('userid', res.data._id)

            setIsAdmin(res.data.accType === 'admin')
            setIsLoggedIn(true)

            setIsCSR(res.data.accType === 'csr')
            setIsLoggedIn(true)
          }
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    }
  }, [])

  return (
    <nav className='navbar'>
      <Link to='/' className='navTitleName'><img src={Carslogo} alt='' /></Link>
      <div className='desktopMenu'>
        <Link to='/' className='desktopMenuListItem'>Home</Link>
        <Link to='/browse' className='desktopMenuListItem'>Browse</Link>
        <Link to='/viewreservation' className='desktopMenuListItem'>Reservation</Link>
        <Link className='desktopMenuListItem' to='/aboutus'>About Us</Link>
        <Link className='desktopMenuListItem' to='/findBranch'>Find A Branch</Link>
        {isAdmin && (<Link to='/adminview' className='desktopMenuListItem'>Admin Management</Link>)}
        {isCSR && (<Link to='/csrview' className='desktopMenuListItem'>CSR Management</Link>)}
      </div>
      <div className='dropdownMenu'>
        {isLoggedIn
          ? <>
            <span className='welcomeUser'>{userInfo.firstName} {userInfo.lastName}</span>
            <button
              className='SignOutBtn dropdownContent' onClick={() => {
                setIsLoggedIn(false)
                setUserInfo({})
                clearCookies('username')
                clearCookies('userid')
                // if (window.location.pathname === "/adminview" || window.location.pathname === "/csrview") {
                window.location.href = '/' // redirect to home page
                // }
              }}
            >Sign Out
            </button>
            </>
          : <div> {/* If the user is not logged in display this */}
            <button className='LogBtn' onClick={toggleCreateUserModal}>Sign Up</button>
            <button className='SignBtn' onClick={toggleLoginModal}>Log in</button>
          </div>}
      </div>

      {isLoggedIn && (
        <>
        </>
      )}

      {loginModal && (
        <>
          <div className='overlay' onClick={toggleLoginModal} />
          <div className='modal-content2'>
            <LogIn
              toggleModal={toggleLoginModal}
              setUserInfo={setUserInfo}
              setIsLoggedIn={setIsLoggedIn}
            />
          </div>
        </>
      )}

      {createUserModal && (
        <>
          <div className='overlay' onClick={toggleCreateUserModal} />
          <div className='modal-content2'>
            <CreateUser
              toggleModal={toggleCreateUserModal}
              setUserInfo={setUserInfo}
              setIsLoggedIn={setIsLoggedIn}
            />
          </div>
        </>
      )}

    </nav>

  )
}

export default Navbar
