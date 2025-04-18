import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className='fixed top-0 left-0 w-full z-50 bg-white'>
        <div className='bg-gradient-to-r from-pinkLigth to-aquamarine h-10 rounded-bl-2xl rounded-br-2xl flex justify-between items-center shadow-md shadow-gray-300'>
          <p className='ml-3'>QIVET | La Calera </p>
          <p className='mr-3'>Simon Bolivar 1254, Calera, Córdoba</p>  
        </div>
        <div className='flex justify-around my-3 items-center '>
          <img src="/img/logos/logo.png" alt="logo qivet" className='w-70'/>
          <Link to="/" className="group relative h-7 text-center text-lg">
            Inicio
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-aquamarine transition-all duration-300 group-hover:w-full"></span>
          </Link>      
          <Link to="/contact" className="group relative h-7 text-center text-lg">
            Contacto
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-aquamarine transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <div className="group relative h-7 text-center w-10 text-lg">
            <i className="fa-regular fa-user"></i>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-aquamarine transition-all duration-300 group-hover:w-full"></span>
          </div>
        </div>
    </div>
  )
}

export default NavBar