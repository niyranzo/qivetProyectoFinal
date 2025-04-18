import React from 'react'

const Contact = () => {
  return (
    <>
    <div className='flex items-center justify-between '>
        <div className='mt-40 w-3xl flex flex-col items-center'>
            <h1 className='text-center text-5xl'>CONTACTA CON NOSOTROS
            </h1>
            <hr className='bg-gradient-to-l from-pinkLigth to-aquamarine h-2 border-0 rounded-2xl w-100 mt-6'/>
            <div className='text-center text-2xl mt-5'>
              <i class="fa-solid fa-envelope"></i>
              <p className='mt-3'>example@gmail.com</p>
            </div>
            <div className='text-center text-2xl mt-5'>
              <i class="fa-solid fa-phone"></i>
              <p className='mt-3'>12343456567</p>
            </div>
            <p></p>
        </div>
        <img src="/img/dogs/dog.png" alt="dog.png" className='w-xl mt-27'/>
    </div>
    </>
    
  )
}

export default Contact