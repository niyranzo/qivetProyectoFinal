import React, { useEffect, useState } from 'react'
import Spinner from '../components/Spinner';
import { useParams } from 'react-router-dom';
import { useAnimals } from '../contexts/AnimalContext';
import { downloadFile, extractFilename } from '../helpers/downloadFile';
import { FaDownload } from 'react-icons/fa';

const Analysis = () => {
  const { id } = useParams();
  const { getAnalysis } = useAnimals();
  const [analysis, setAnalysis] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchanalysiss = async () => {
      try {
        const data = await getAnalysis(id);
        setAnalysis(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchanalysiss();
  }, [id, getAnalysis]);

  return (
    <div className='mt-40 flex flex-col items-center px-4'>
          <div className='flex flex-col items-center w-full justify-center my-16'>
            <h1 className='text-5xl font-bold mb-4 text-center'>Análisis por Imagen</h1>
            <hr className='bg-gradient-to-r from-pinkLigth to-aquamarine h-2 border-0 rounded-2xl w-1/2' />
          </div>
    
          {loading ? (
            <Spinner />
          ) : analysis.length === 0 ? (
            <p className='text-lg font-semibold text-gray-500 mb-10 text-center'>
              Tu mascota aún no tiene análisis por imagen.
            </p>
          ) : (
            <div className='bg-white shadow-md rounded-xl p-6 w-full max-w-5xl mb-20'>
              <table className='w-full text-center'>
                <thead>
                  <tr className='border-b-2 border-purple-400'>
                    <th className='py-2 px-4 font-semibold'>Fecha</th>
                    <th className='py-2 px-4 font-semibold'>Documento PDF</th>
                  </tr>
                </thead>
                <tbody>
                  {analysis.map((analysis, index) => {
                    const date = new Date(analysis.date).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    });
                    
                    // Extraer nombres de archivo
                    const pdfFilename = extractFilename(analysis.report_pdf);
                    
                    // Construir URLs completas
                    const pdfUrl = `http://localhost:3000/api/pdfs/${pdfFilename}`;
                    
                    return (
                      <tr key={index} className='border-t border-gray-200'>
                        <td className='py-4 px-4'>{date}</td>
                        
                        <td className='py-4 px-4'>
                          <div className='flex items-center justify-center gap-2'>
                            <span>{pdfFilename}</span>
                            <a
                              href={pdfUrl}
                              download={pdfFilename}
                              className='text-gray-700 hover:text-black cursor-pointer flex items-center'
                              onClick={(e) => {
                                e.preventDefault();
                                downloadFile(pdfUrl, pdfFilename);
                              }}
                            >
                              <FaDownload />
                            </a>
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

export default Analysis