import React from 'react'

const Home = () => {
  return (
    <>
        <div className='flex justify-evenly mt-20 items-center'>
            <div className='mt-25 flex flex-col justify-center'>
                <p className='text-6xl w-150 leading-snug font-bold mb-7'>
                Especialistas en 
                la salud de tus
                mascotas
                </p>
                <hr className='bg-gradient-to-l from-pinkLigth to-aquamarine h-2 border-0 rounded-2xl w-3xl'/>
                <p className='text-2xl w-150 m-7 leading-relaxed'>Reserve tu cita con nosotros y
                    asegura el bienestar de tu mascota.
                </p>
                <button className='inset-ring-2 inset-ring-purple-500 w-50 self-center py-3 rounded-lg font-bold text-lg'>Contacta</button>
            </div>
        <img src="img/dogs/dogs.png" alt="dogs.png" className='w-150' />
        </div>
        <div className='flex justify-between items-center mt-6'>
          <div className='mt-10 flex flex-col text-xl '>
            <h1 className='text-4xl font-bold mb-4'>Nuestro Horario </h1>
            <hr className='bg-gradient-to-r from-pinkLigth to-aquamarine h-2 border-0 rounded-2xl w-100'/>
            <p className='ml-9 m-2'>De Lunes a Viernes: </p>
            <p className='self-center font-semibold'>Mañanas → 10:00 - 13:00</p>
            <p className='self-center font-semibold'>Tardes → 16:00 - 20:30</p>
            <p className='ml-9 m-2'>Sábados:</p>
            <p className='self-center font-semibold'>Mañanas → 10:00 - 13:00</p>
            <p className='self-center font-semibold'>Tardes → 17:00 - 19:00</p>
          </div>
          <div>
            <h1 className='text-3xl text-center mb-2 font-bold '>¿Donde encontrarnos?📌</h1>
            <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3899.251775326414!2d-64.34337158821248!3d-31.36298599356581!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x942d61ce6498a2a7%3A0xc7fa8a01a34c6aa!2sCl%C3%ADnica%20Veterinaria%20Qivet!5e1!3m2!1ses!2ses!4v1744737233435!5m2!1ses!2ses" 
            width="600"
            height="450" 
            allowfullscreen="" 
            loading="lazy" 
            referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
        <div className='flex flex-col items-center'>
          <h2 className="relative text-3xl font-bold text-center inline-block">
            Nuestro Equipo
            <span className="block absolute left-1/2 -bottom-2 h-0.5 w-40 -translate-x-1/2 bg-aquamarine"></span>
            <span className="block absolute left-1/2 -bottom-4 h-0.5 w-24 -translate-x-1/2 bg-purple-600"></span>
          </h2>
          <div className='flex w-full justify-around'>
            <div className='flex flex-col items-center'>
              <img src="img/user-icon.png" alt="user.png" className='w-70 h-70 border-1 border-blue-400 rounded-full' />
              <p>
                Martina
              </p>
              <p>Clínica especialista en Nutrición y Anestesiología.</p>
            </div>
            <div className='flex flex-col items-center'>
            <img src="img/user-icon.png" alt="user.png" className='w-70 h-70 border-1 border-blue-400 rounded-full' />
            <p>
                  Malvina
                </p>
                <p>Clínica especialista en Nutrición y Anestesiología.</p>
            </div>
          </div>
        </div>
    </>
    
  )
}

export default Home