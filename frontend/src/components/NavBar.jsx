import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/Auth/useAuth';


const NavBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/"); // ← redirección correcta después del logout
  }
  return (
    <div className='fixed top-0 left-0 w-full z-50 bg-white '>
        <div className='bg-gradient-to-r from-pinkLigth to-aquamarine h-10 rounded-bl-2xl rounded-br-2xl justify-between items-center shadow-md shadow-gray-300 flex'>
          <p className='ml-3 text-center w-full md:w-auto md:text-left'>QIVET | La Calera </p>
          <p className='mr-3 hidden md:block'>Simon Bolivar 1254, Calera, Córdoba</p>
      </div>
        <div className='flex justify-around my-3 items-center'>
          {/* Imagen para pantallas grandes (md y superiores) */}
          <img src="/img/logos/logo.png" alt="logo qivet" className='w-70 hidden md:block' />

          {/* Imagen para pantallas pequeñas (por debajo de md) */}
          <img src="/img/logos/logoSmall.png" alt="logo qivet" className='w-20 md:hidden' />
          
          { !user ? (
            <>
              <Link to="/" className="group relative h-7 text-center text-lg">
                Inicio
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-aquamarine transition-all duration-300 group-hover:w-full"></span>
              </Link>      
              <Link to="/contact" className="group relative h-7 text-center text-lg">
                Contacto
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-aquamarine transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <div className="group relative h-7 text-center w-10 text-lg">
                <Link to="/login"><i className="fa-regular fa-user"></i></Link>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-aquamarine transition-all duration-300 group-hover:w-full"></span>
              </div>
            </>
          ) : (
            <button onClick={ () => handleLogout()} className='group relative'>
              Cerrar Sesion
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-aquamarine transition-all duration-300 group-hover:w-full"></span>
            </button>
          )}

        </div>
    </div>
  )
}

export default NavBar