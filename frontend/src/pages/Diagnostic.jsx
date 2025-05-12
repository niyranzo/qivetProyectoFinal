import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAnimals } from '../contexts/AnimalContext';
import { FaDownload } from 'react-icons/fa';
import { downloadFile, extractFilename } from '../helpers/downloadFile';

const API_URL = import.meta.env.VITE_API_URL;

const Diagnostic = () => {
  const { id } = useParams();
  const { getDiagnostics } = useAnimals();
  const [diagnostics, setDiagnostics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiagnostics = async () => {
      try {
        const data = await getDiagnostics(id);
        setDiagnostics(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDiagnostics();
  }, [id, getDiagnostics]);

  // Ya no necesitamos la función downloadFile aquí, ya que la importamos del archivo utilitario

  return (
    <div className='mt-40 flex flex-col items-center px-4'>
      <div className='flex flex-col items-center w-full justify-center my-16'>
        <h1 className='text-5xl font-bold mb-4 text-center'>Diagnosticos por Imagen</h1>
        <hr className='bg-gradient-to-r from-pinkLigth to-aquamarine h-2 border-0 rounded-2xl w-1/2' />
      </div>

      {loading ? (
        <p>Cargando diagnósticos...</p>
      ) : diagnostics.length === 0 ? (
        <p className='text-lg font-semibold text-gray-500 mb-10 text-center'>
          Tu mascota aún no tiene diagnósticos por imagen.
        </p>
      ) : (
        <div className='bg-white shadow-md rounded-xl p-6 w-full max-w-5xl mb-20'>
          <table className='w-full text-center'>
            <thead>
              <tr className='border-b-2 border-purple-400'>
                <th className='py-2 px-4 font-semibold'>Fecha</th>
                <th className='py-2 px-4 font-semibold'>Documento PDF</th>
                <th className='py-2 px-4 font-semibold'>Imagen</th>
              </tr>
            </thead>
            <tbody>
              {diagnostics.map((diagnostic, index) => {
                const date = new Date(diagnostic.date).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                });
                
                // Extraer nombres de archivo
                const pdfFilename = extractFilename(diagnostic.report_pdf);
                const imageFilename = extractFilename(diagnostic.image);
                
                // Construir URLs completas
                const pdfUrl = `http://localhost:3000/api/pdfs/${pdfFilename}`;
                const imageUrl = `http://localhost:3000/api/images/${imageFilename}`;
                
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
                    
                    <td className='py-4 px-4'>
                      <div className='flex items-center justify-center gap-2'>
                        <span>{imageFilename}</span>
                        <a
                          href={imageUrl}
                          download={imageFilename}
                          className='text-gray-700 hover:text-black cursor-pointer flex items-center'
                          onClick={(e) => {
                            e.preventDefault();
                            downloadFile(imageUrl, imageFilename);
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
  );
};

export default Diagnostic;