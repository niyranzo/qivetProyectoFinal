import React, { useState, useEffect } from 'react';
import { useAdmin } from '../../hooks/Admin/useAdmin';
import { useParams } from 'react-router-dom';
import { FaFilePdf, FaImage } from 'react-icons/fa';
import { useAnimals } from '../../hooks/Animal/useAnimal';

const AnalysisUpload = () => {
  const { id: id_animal } = useParams();
  const { uploadAnalysisFiles } = useAdmin();
  const { getAnimal } = useAnimals();
  const [pet, setPet] = useState({});

  const [formData, setFormData] = useState({
    analysisPdf: null,
  });

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  useEffect(() => {
    setIsSubmitDisabled(!(formData.analysisPdf));

    const fetchPet = async () => {
      try {
        const animal = await getAnimal(id_animal);
        setPet(animal);
      } catch (error) {
        console.error("Error al cargar la mascota:", error);
      }
    };
    fetchPet();
  }, [formData.analysisPdf, getAnimal, id_animal]);

  const handleChange = async (e) => {
    const { name, files } = e.target;

    if (files && files.length > 0) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: e.target.value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    await uploadAnalysisFiles(id_animal, formData.analysisPdf);
  };

  return (
    <div className='mt-50 bg-white rounded-lg shadow-md p-6 space-y-4 max-w-xl mx-auto'>
          <p className="font-semibold border-b-2 border-purple-400 pb-3 mb-4 text-3xl text-gray-800 flex">
            Añadir Análisis - <p className='text-gray-500 ml-2'> { pet.name}</p></p>
    
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0 sm:space-x-4 mb-10">
            <label htmlFor="analysisPdf" className="text-purple-600 font-semibold flex items-center gap-2 text-lg">
              PDF <FaFilePdf className="text-xl" />
            </label>
            <div className="flex-1 flex items-center border border-gray-300 rounded-lg overflow-hidden w-full transition duration-300 hover:border-purple-500 ">
              <label
                htmlFor="analysisPdf"
                className="cursor-pointer bg-purple-500 text-white text-sm px-4 py-2 hover:bg-purple-600 transition duration-300 ease-in-out flex-none"
              >
                Seleccionar archivo
              </label>
              <input
                id="analysisPdf"
                type="file"
                name="analysisPdf"
                accept=".pdf"
                onChange={handleChange}
                className="hidden"
              />
              <span className="ml-3 text-gray-700 text-sm truncate px-2 py-1 bg-gray-50 flex-1">
                {formData.analysisPdf ? formData.analysisPdf.name : "Ningún archivo seleccionado"}
              </span>
            </div>
          </div>
    
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
            className={`w-full px-6 py-1 rounded-lg border-2 font-semibold text-lg transition duration-300 ease-in-out
              ${isSubmitDisabled
                ? 'border-gray-300 text-gray-400 cursor-not-allowed bg-gray-100'
                : 'border-purple-500 text-purple-700 hover:bg-purple-500 hover:text-white'
              }`}
          >
            Subir Diagnóstico
          </button>
        </div>
  )
}

export default AnalysisUpload