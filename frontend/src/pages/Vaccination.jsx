import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAnimals } from '../contexts/AnimalContext';
import Spinner from '../components/Spinner';

const Vaccination = () => {
    const { id } = useParams();
    const { getVaccination } = useAnimals();
    const [vaccinations, setVaccination] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDiagnostics = async () => {
          try {
            const data = await getVaccination(id);
            setVaccination(data);
          } catch (error) {
            console.error(error);
          } finally {
            setLoading(false);
          }
        };
        fetchDiagnostics();
      }, [id, getVaccination]);
    
  return (
    <div className='mt-40 flex flex-col items-center px-4'>
        <div className='flex flex-col items-center w-full justify-center my-16'>
          <h1 className='text-5xl font-bold mb-4 text-center'>Vacunas</h1>
          <hr className='bg-gradient-to-r from-pinkLigth to-aquamarine h-2 border-0 rounded-2xl w-1/2' />
        </div>
  
        {loading ? (
            <Spinner />
        ) : vaccinations.length === 0 ? (
          <p className='text-lg font-semibold text-gray-500 mb-10 text-center'>
            Tu mascota aún no tiene vacunas.
          </p>
        ) : (
          <div className='bg-white shadow-md rounded-xl p-6 w-full max-w-5xl mb-20'>
            <table className='w-full text-center'>
              <thead>
                <tr className='border-b-2 border-purple-400'>
                  <th className='py-2 px-4 font-semibold'>Vacunación</th>
                  <th className='py-2 px-4 font-semibold'>Fecha</th>
                  <th className='py-2 px-4 font-semibold'>Próxima Dosis</th>
                </tr>
              </thead>
              <tbody>
                {vaccinations.map((vaccination, index) => {
                  const date = new Date(vaccination.date).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  });                  

                  return (
                    <tr key={index} className='border-t border-gray-200'>                      
                      <td className='py-4 px-4'>
                        <div className='flex items-center justify-center gap-2'>
                          <span>{vaccination.vaccine_name}</span>
                        </div>
                      </td>
                      
                      <td className='py-4 px-4'>
                        <div className='flex items-center justify-center gap-2'>
                          <span>{date}</span>
                        </div>
                      </td>

                      <td className='py-4 px-4'>
                        <div className='flex items-center justify-center gap-2'>
                          <span>{vaccination.next_dose}</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
  )
}

export default Vaccination