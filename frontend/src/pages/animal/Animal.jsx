import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAnimals } from '../../hooks/Animal/useAnimal';
import Spinner from '../../components/Spinner';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';

const API_URL = import.meta.env.VITE_API_URL;

const Animal = () => {
  const { id } = useParams();
  // Asegúrate de que getLastDayConsulting devuelva un objeto de consulta o null/undefined.
  const { getAnimal, loading, getLastDayConsulting, setNextVisitDate } = useAnimals();
  const [pet, setPet] = useState({});
  // Cambiado de [] a null, ya que esperamos un objeto de consulta individual o nada.
  const [consultation, setConsultation] = useState(null); 
  const [showNextVisitForm, setShowNextVisitForm] = useState(false);
  const [selectedVisitDate, setSelectedVisitDate] = useState(null);
  const [reservedDates, setReservedDates] = useState([]);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const animal = await getAnimal(id);
        setPet(animal);
      } catch (error) {
        console.error("Error al cargar la mascota:", error);
      }
    };

    const fetchConsultation = async () => {
      try {
        const data = await getLastDayConsulting(id);
        setConsultation(data); 
      } catch (error) {
        console.error("Error al cargar la última consulta:", error);
        setConsultation(null);
      }
    };

    const fetchReservedDates = async () => {
      try {
        const res = await fetch(`${API_URL}consultation/reserved-dates`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setReservedDates(data.reservedDates.map(date => new Date(date)));
      } catch (error) {
        console.error("Error al cargar fechas reservadas:", error);
        toast.error("Error al cargar las fechas de citas disponibles.");
      }
    };

    fetchPet();
    fetchConsultation();
    fetchReservedDates();
  }, [id, getAnimal, getLastDayConsulting]); // Agrega id y las funciones como dependencias

  // Función para manejar el envío del formulario de próxima visita
  const handleSetNextVisitDate = async () => {
    if (!selectedVisitDate) {
      toast.error("Selecciona una fecha válida");
      return;
    }

    try {
      const result = await setNextVisitDate(id, selectedVisitDate.toISOString());

      if (result && result.consultation) {
        toast.success(`Turno solicitado para ${selectedVisitDate.toLocaleString('es-ES', { dateStyle: 'medium', timeStyle: 'short' })}`);
        setConsultation(result.consultation); // Actualiza la consulta con la nueva fecha de próxima visita
        setShowNextVisitForm(false); // Cierra el formulario
        setSelectedVisitDate(null); // Limpia la fecha seleccionada
        // Opcional: Volver a cargar las fechas reservadas para reflejar el nuevo turno
        // fetchReservedDates(); 
      } else {
        toast.error(result.error || "Error al solicitar el turno");
      }
    } catch (err) {
      console.error("Error al confirmar el turno:", err);
      toast.error(err.message || "Error inesperado al solicitar el turno");
    }
  };


  return (
    <div className='mt-40'>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className='flex flex-col justify-center'>
            <div className='flex justify-center gap-20'>
              <div className='flex flex-col items-center justify-center'>
                <div className='flex flex-col items-center justify-center mb-5'>
                  <h1 className='text-5xl font-bold mb-2'>{pet?.name}</h1>
                  <hr className='bg-gradient-to-r from-pinkLigth to-aquamarine h-2 border-0 rounded-2xl w-100' />
                </div>
                <div className='flex flex-col w-lg items-center rounded-xl shadow-lg shadow-gray-500 py-2'>
                  <p className='border-b-2 border-b-purple-600 px-4 text-3xl font-bold mb-5'>Mis Datos</p>
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
              <div
                style={{
                  backgroundImage: `url(${API_URL + pet.photo})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
                className='w-100 h-100 rounded-lg'
              ></div>
            </div>

            <div className='flex justify-center'>
              <div className='bg-white rounded-xl w-xl shadow-md p-6 mt-8'>
                <div className='flex justify-around border-b border-purple-400 pb-2 mb-4 font-semibold'>
                  <span>Próxima Visita</span>
                </div>
                <div className='flex justify-around items-center mb-6 text-lg'>
                  {/* Utiliza optional chaining para acceder a las propiedades de consultation */}
                  <span className='font-bold text-xl'>
                    {consultation?.nextVisitDate // Si consultation y nextVisitDate existen
                      ? new Date(consultation.nextVisitDate).toLocaleString('es-ES', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })
                      : 'Sin Fecha'}
                  </span>
                </div>
                {/* Solo muestra el botón si consultation existe y nextVisitDate es null */}
                {consultation && consultation.nextVisitDate === null && (
                  <button
                    className='w-full border border-purple-500 rounded-md py-2 text-purple-600 font-semibold hover:bg-purple-600 hover:text-white transition'
                    onClick={() => setShowNextVisitForm(true)}
                  >
                    Pedir Turno
                  </button>
                )}
                {/* Si consultation es null (sin consultas previas) también se podría mostrar el botón */}
                {!consultation && (
                    <button
                        className='w-full border border-purple-500 rounded-md py-2 text-purple-600 font-semibold hover:bg-purple-600 hover:text-white transition'
                        onClick={() => setShowNextVisitForm(true)}
                    >
                        Pedir Primer Turno
                    </button>
                )}
              </div>
            </div>

            <h2 className='relative text-3xl font-bold text-center inline-block my-15'>
              ¿Qué quieres consultar?
              <span className='block absolute left-1/2 -bottom-2 h-0.5 w-40 -translate-x-1/2 bg-aquamarine'></span>
              <span className='block absolute left-1/2 -bottom-4 h-0.5 w-24 -translate-x-1/2 bg-purple-600'></span>
            </h2>
            <div className='flex justify-around mb-16 wrap-normal'>
              <Link
                to={`/animal/${id}/diagnostic`}
                className='border-purple-600 border-2 rounded-xl px-3 py-3 text-xl hover:bg-purple-500 hover:text-white transition duration-300'
              >
                Diagnóstico por Imagen
              </Link>
              <Link
                to={`/animal/${id}/analysis`}
                className='border-purple-600 border-2 rounded-xl px-3 py-3 text-xl hover:bg-purple-500 hover:text-white transition duration-300'
              >
                Análisis de Sangre
              </Link>
              <Link
                to={`/animal/${id}/vaccination`}
                className='border-purple-600 border-2 rounded-xl px-3 py-3 text-xl hover:bg-purple-500 hover:text-white transition duration-300'
              >
                Vacunaciones
              </Link>
            </div>
          </div>

          {/* Modal para pedir turno */}
          {showNextVisitForm && (
            <div className='fixed inset-0 bg-black/30 flex justify-center items-center z-50'>
              <div className='bg-white p-6 rounded-lg shadow-lg text-center w-96'>
                <h2 className='text-xl font-bold mb-4'>Selecciona día y hora</h2>

                <DatePicker
                  selected={selectedVisitDate}
                  onChange={(date) => setSelectedVisitDate(date)}
                  placeholderText='Selecciona...'
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={30}
                  dateFormat="yyyy-MM-dd HH:mm"
                  minDate={new Date()}
                  filterDate={(date) => date.getDay() !== 0} // Domingo cerrado
                  filterTime={(time) => {
                    const day = time.getDay();
                    const hour = time.getHours();
                    const minutes = time.getMinutes();
                    const currentTime = hour + minutes / 60;

                    if (day >= 1 && day <= 5) {
                      // Lunes a Viernes
                      return (
                        (currentTime >= 10 && currentTime <= 13) ||
                        (currentTime >= 16 && currentTime <= 20.5)
                      );
                    } else if (day === 6) {
                      // Sábado
                      return (
                        (currentTime >= 10 && currentTime <= 13) ||
                        (currentTime >= 17 && currentTime <= 19)
                      );
                    }
                    return false;
                  }}
                  excludeTimes={
                    reservedDates
                      .filter(
                        (d) =>
                          selectedVisitDate &&
                          new Date(d).toDateString() === new Date(selectedVisitDate).toDateString()
                      )
                      .map((d) => new Date(d))
                  }
                  className='border px-4 py-2 rounded w-full'
                />

                <div className='flex justify-center gap-4 mt-4'>
                  <button
                    onClick={handleSetNextVisitDate} // Usamos la función separada
                    className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700'
                  >
                    Confirmar
                  </button>
                  <button
                    onClick={() => {
                        setShowNextVisitForm(false);
                        setSelectedVisitDate(null); // Limpiar al cancelar
                    }}
                    className='bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500'
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Animal;