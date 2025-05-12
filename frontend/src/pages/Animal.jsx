import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAnimals } from '../contexts/AnimalContext';
import Spinner from '../components/Spinner';
const API_URL = import.meta.env.VITE_API_URL;



const Animal = () => {
    const { id } = useParams();
    const { getAnimal, loading } = useAnimals();
    const [ pet, setPet ] = useState({});

    useEffect(() => {
        const fetchPet = async () => {
          try {
            const animal = await getAnimal(id);
            setPet(animal);
          } catch (error) {
            console.error(error);
          }
        }
        fetchPet();
    }, []);

  return (
    <div className='mt-40'>
      { loading ? (
        <Spinner />
      ) : (
        <>
        <div className='flex flex-col justify-center'> 
            <div className='flex justify-center'>
              <div className='w-full flex flex-col items-center justify-center' >
                <div className='flex flex-col items-center justify-center mb-5'>
                  <h1 className='text-5xl font-bold mb-2'>{pet?.name}</h1>
                  <hr className='bg-gradient-to-r from-pinkLigth to-aquamarine h-2 border-0 rounded-2xl w-100'/>
                </div>
                <div className='flex flex-col w-lg items-center rounded-xl shadow-lg shadow-gray-500 py-2'>
                  <p className='border-b-2 border-b-purple-600  px-4 text-3xl font-bold mb-5'>Mis Datos</p>
                  <div className='grid grid-cols-2 gap-4 w-full px-6 pb-4'>
                    <div className='flex flex-col items-center'>
                      <p className='text-xl font-bold'>Especie</p>
                      <p>{pet.species}</p>
                    </div>
                    <div className='flex flex-col items-center'>
                      <p className='text-xl font-bold'>Edad</p>
                      <p>{pet.age}</p>
                    </div>
                    <div className='col-span-2 flex flex-col items-center'>
                      <p className='text-xl font-bold'>Raza</p>
                      <p>{pet.race}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ 
                  backgroundImage: `url(${API_URL + pet.photo})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'}}
                  className='w-120 h-90 rounded-lg'>
              </div>
              
            </div>
            <h2 className="relative text-3xl font-bold text-center inline-block my-15">
              ¿Que quieres consultar?
              <span className="block absolute left-1/2 -bottom-2 h-0.5 w-40 -translate-x-1/2 bg-aquamarine"></span>
              <span className="block absolute left-1/2 -bottom-4 h-0.5 w-24 -translate-x-1/2 bg-purple-600"></span>
            </h2>
            <div className='flex justify-around mb-16 '>
              <Link to={`/animal/${id}/diagnostic`} className='border-purple-600 border-2 rounded-xl px-3 py-3 text-xl hover:bg-purple-500 hover:text-white transition duration-300'>Diagnostico por Imagen</Link>
              <Link to={`/animal/${id}/analysis`} className='border-purple-600 border-2 rounded-xl px-3 py-3 text-xl hover:bg-purple-500 hover:text-white transition duration-300'>Análisis de Sangre</Link>
              <Link to={`/animal/${id}/vaccination`}className='border-purple-600 border-2 rounded-xl px-3 py-3 text-xl hover:bg-purple-500 hover:text-white transition duration-300'>Vacunaciones</Link>
            </div>
          </div>
        </>
      ) }
    </div>
  )
}

export default Animal