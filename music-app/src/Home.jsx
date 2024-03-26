import React from 'react'
import { Button, Navbar, Typography } from '@material-tailwind/react'
import NavMenu from './Navbar'
import { Footer } from './Footer.jsx'
import { useState } from 'react'

export const Home = () => {
  const [login, setLogin] = useState('false');

  const handleLogin = () =>{
    fetch('http://127.0.0.1:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      response.ok ? setLogin(true) : setLogin(false);
    })
    .catch(error => console.log('Error:', error));
  }

  return (
    <>
        <NavMenu />
        <div className='h-100 py-16'> 
          <img className="h-80 w-full object-cover object-center" src="/src/assets/log-in-page-logo-transparent.png" alt="" />
          <div  className='flex justify-center items-center my-10'>
            <Button onClick={handleLogin} color='white'>Get Start</Button>
          </div>
        </div>
        <Footer />
    </>
  )
}
