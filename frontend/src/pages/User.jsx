import React from 'react'
import { useAuth } from '../contexts/AuthContext';
import { useAnimals } from '../contexts/AnimalContext';
import { Link } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_URL;


const User = () => {
  const { user } = useAuth();
  const { animals, loading } = useAnimals();
  return (
    <div className='mt-50'>
      { loading ? (<>
        <div>Cargando...</div>
      </>) : (
        <>
    <div className='flex justify-center'>
            <div className='flex flex-col items-center justify-center mr-40' >
              <div className='flex font-bold text-5xl mb-5'>
                <p className='mr-3'>{user.name}</p>  
                <p className=''>{user.lastname}</p>
              </div>
              <hr className='bg-gradient-to-r from-pinkLigth to-aquamarine h-2 border-0 rounded-2xl w-100'/>
            </div>
            <div className='flex flex-col items-center justify-center rounded-xl shadow-lg shadow-gray-500 px-20 py-2'>
              <p className='border-b-2 border-b-aquamarine px-4 text-3xl font-bold mb-3'>Tus Datos</p>
              <p className='text-lg'><i class="fa-solid fa-envelope mr-2"></i>{user.email}</p>
              <p className='text-lg'><i class="fa-solid fa-phone mr-2" ></i>{user.phone}</p>
            </div>
          </div>
          <div className='flex flex-col items-center mt-10'>
            <p className='w-45 text-2xl font-bold text-center mt-10 border-b-2 border-b-aquamarine'>Tus Mascotas</p>
            <div className="mt-10 flex justify-evenly w-full mb-10">
              {animals?.map((animal) => (
                <Link to={`/animal/${animal.id_animal}`} 
                  key={animal.id_animal}
                  style={{ 
                  backgroundImage: `url(${API_URL + animal.photo})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'}}
                  className='w-60 h-70 rounded-lg flex items-baseline-last transition-transform duration-300 hover:scale-105 cursor-pointer' 
                >
                  <div className="bg-white h-20 w-full rounded-lg shadow-lg shadow-gray-500 flex items-center justify-center flex-col">
                    <p className='border-purple-600 border-b-1 w-20 font-bold text-center mb-2 '>{animal.name}</p>
                    <p>Ver Detalles</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default User