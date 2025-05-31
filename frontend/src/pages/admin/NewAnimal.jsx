import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAdmin } from '../../hooks/Admin/useAdmin';

const NewAnimal = () => {
  const { id } = useParams();
  const { addAnimal } = useAdmin();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    species: '',
    race: '',
    age: '',
    photo: null,
  });
  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const newPhoto = type === 'file' ? files[0] : value;
    setFormData((prev) => ({
      ...prev,
      [name]: newPhoto,
    }));

    if (type === 'file' && files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(files[0]);
    } else {
      setPreviewImage(null); // Clear preview when no image is selected
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await addAnimal(id, formData);
      if (success) {
        navigate('/admin');
      }
    } catch (error) {
      console.error('Error al agregar mascota', error);
    }
  };

  return (
    <div className="flex items-center justify-center m-20 mt-50 flex-col">
      <h2 className="text-3xl font-bold text-center text-gray-900">Registrar Mascota</h2>
      <hr className='bg-gradient-to-r from-pinkLigth to-aquamarine h-2 border-0 rounded-2xl w-70 md:w-100 mt-5'/>

      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <form className="mt-6 space-y-6" onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            required
            className="w-full px-4 py-2 border rounded-lg"
            onChange={handleChange}
          />
          <input
            type="text"
            name="species"
            placeholder="Especie"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={handleChange}
          />
          <input
            type="text"
            name="race"
            placeholder="Raza"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={handleChange}
          />
          <input
            type="number"
            name="age"
            placeholder="Edad"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={handleChange}
          />
          <input
            type="file"
            name="photo"
            // accept="image/*"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={handleChange}
          />
          {previewImage && (
            <div className="mt-4 flex justify-center">
              <img
                src={previewImage}
                alt="Vista previa"
                className="max-w-full h-auto rounded-lg"
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-white ring-2 ring-purple-500 text-black hover:bg-purple-500 hover:text-white transition duration-300"
          >
            Registrar Mascota
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewAnimal;