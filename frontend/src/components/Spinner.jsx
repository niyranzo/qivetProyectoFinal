//spinner de perrito
import React from 'react'
import loadingGif from '../assets/pets-loader.gif'; // Ajusta la ruta según tu estructura

const Spinner = () => {
  return (
    <div>
        <img src={loadingGif} alt="loading..." className='w-30' />
    </div>
  )
}

export default Spinner