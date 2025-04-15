import React from 'react'

const Footer = () => {
  return (
    <div className=' bg-pinkLigth py-2 px-10 rounded-tl-2xl rounded-tr-2xl shadow-xl shadow-gray-500 '>
      <div className='flex justify-between items-center mb-5'>
        <div className='flex text-lg'>
          <p className='mx-5'>INICIO</p>
          <p className='mx-5'>CONTACTO</p>
        </div>
        <img src="img/logos/logoBlack.png" alt="logoBlack.png" className='w-70'/>
      </div> 
      <hr />
      <div className='flex justify-between mt-5 text-base'>
        <p>© Copyright Qivet</p>
        <div className='text-2xl'>
          <i class="fa-brands fa-instagram mx-5"></i>
          <i class="fa-brands fa-facebook mx-5"></i>
        </div>
      </div>
    </div>
  )
}

export default Footer