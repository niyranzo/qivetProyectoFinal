import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className=' bg-pinkLigth py-2 px-5 rounded-tl-2xl rounded-tr-2xl shadow-xl shadow-gray-500 '>
      <div className='flex justify-between items-center mb-5'>
        <div className='flex text-lg'>
          <Link to="/" className='mx-5 hover:font-bold transition-all duration-300'>INICIO</Link>
          <Link to="/contact" className='mx-5 hover:font-bold transition-all duration-300'>CONTACTO</Link>
        </div>
        <img src="img/logos/logoBlack.png" alt="logoBlack.png" className='w-70'/>
      </div> 
      <hr />
      <div className='flex justify-between mt-5 text-base'>
        <p>© Copyright Qivet</p>
        <div className='text-2xl'>
        <a href="https://www.instagram.com/qivet.lacalera/" target="_blank" className="mx-5 text-black hover:text-purple-600 transition-colors duration-300">
          <i className="fa-brands fa-instagram"></i>
        </a>
        <a href="https://www.facebook.com/profile.php?id=100063613568712&locale=es_ES" target="_blank"className="mx-5 text-black hover:text-purple-600 transition-colors duration-300">
          <i className="fa-brands fa-facebook"></i>
        </a>
        </div>
      </div>
    </div>
  )
}

export default Footer