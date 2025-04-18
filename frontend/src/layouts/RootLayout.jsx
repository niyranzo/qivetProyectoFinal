import React from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom';



const RootLayout = () => {
  return (
    <>
      <NavBar />
      <main className="w-[70%] mx-auto">
      <Outlet />
      </main>
      <Footer/>
    </>
  )
}

export default RootLayout
