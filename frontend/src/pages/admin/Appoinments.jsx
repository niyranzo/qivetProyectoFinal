import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Spinner from '../../components/Spinner';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { toast } from 'react-toastify';
import { useAdmin } from '../../hooks/Admin/useAdmin';

const API_URL = import.meta.env.VITE_API_URL;

const Appointments = () => {
    const [reservedDates, setReservedDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const { deleteAppointment, loading } = useAdmin(); // Renombrar loading de admin para evitar conflictos
    const [componentLoading, setComponentLoading] = useState(true); // Estado de carga local del componente
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedAppointmentId, setSelectedAppointmentId] = useState(null); // Para guardar el ID de la cita a borrar

    const fetchReservedDates = async () => {
        setComponentLoading(true);
        try {
            const response = await fetch(`${API_URL}consultation/animal/reserved-dates`, {
                method: 'GET',
                credentials: 'include', // Asumo que usas cookies para la sesión/autenticación
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setReservedDates(Array.isArray(data.reservedDates) ? data.reservedDates : []);
        } catch (err) {
            console.error('Error fetching reserved dates:', err);
            toast.error('Error al cargar las citas.');
        } finally {
            setComponentLoading(false); // Usar el loading local
        }
    };

    // Función que se llama cuando se hace clic en "Borrar cita"
    const handleDeleteClick = (appointmentId) => {
        setSelectedAppointmentId(appointmentId);
        setShowConfirm(true);
    };

    // Función que se llama cuando se confirma la eliminación
    const confirmDelete = async () => {
        console.log("entra");
        try {
            await deleteAppointment(selectedAppointmentId);
            toast.success("Cita eliminada exitosamente."); // O un mensaje más específico si lo necesitas
            await fetchReservedDates(); // Volver a cargar las citas para actualizar la vista
        } catch (error) {
            console.error("Error al eliminar la cita:", error);
            toast.error("Error al eliminar la cita.");
        } finally {
            setShowConfirm(false);
            setSelectedAppointmentId(null);
        }
    };

    // Función que se llama cuando se cancela la eliminación
    const cancelDelete = () => {
        setShowConfirm(false);
        setSelectedAppointmentId(null);
    };

    useEffect(() => {
        fetchReservedDates();
    }, []); // No hay dependencias aquí, solo se carga una vez al montar

    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
            const dateString = format(date, 'yyyy-MM-dd');

            const hasAppointment = reservedDates.some(appointment => {
                const reservedDate = new Date(appointment.date);
                return format(reservedDate, 'yyyy-MM-dd') === dateString;
            });

            if (hasAppointment) {
                return 'has-appointment';
            }
        }
        return null;
    };

    const onDateChange = (date) => {
        setSelectedDate(date);
    };

    // Unir los estados de carga
    if (componentLoading || loading) {
        return (
            <div className="mt-40 flex justify-center items-center h-full">
                <Spinner />
            </div>
        );
    }

    return (
        <div className='mt-40 flex flex-col items-center px-4'>
            {/* Page Title Section */}
            <div className='flex flex-col items-center w-full justify-center my-16'>
                <h1 className='text-5xl font-bold mb-4 text-center'>Próximas Citas</h1>
                <hr className='bg-gradient-to-r from-pinkLigth to-aquamarine h-2 border-0 rounded-2xl w-1/2' />
            </div>

            <div className='flex flex-col lg:flex-row gap-6'>
                {/* Calendar Section */}
                <div className='bg-white shadow-md rounded-xl p-6 w-full max-w-xl mb-20 flex justify-center'>
                    <Calendar
                        onChange={onDateChange}
                        value={selectedDate}
                        tileClassName={tileClassName}
                        locale="es-ES"
                    />
                </div>

                {/* Appointments for Selected Date Section */}
                <div className='w-full max-w-xl mb-20 flex flex-col items-center justify-center p-6'>
                    <h2 className='text-3xl font-bold mb-4 text-center border-b-1 border-aquamarine pb-2'>
                        Citas para el {format(selectedDate, 'dd MMMM', { locale: es })}
                    </h2>
                    {
                        // Filtra las citas para la fecha seleccionada
                        reservedDates
                            .filter(appointment =>
                                format(new Date(appointment.date), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
                            )
                            .length > 0 ? (
                            reservedDates
                                .filter(appointment =>
                                    format(new Date(appointment.date), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
                                )
                                .map((appointment, index) => (
                                    <div key={appointment.id || index} className='text-center py-2 flex items-center justify-between w-full border-b-1 border-purple-500'>
                                        <p className='flex-grow'>
                                            <span className='font-bold'>{appointment.animalName}</span>: {format(new Date(appointment.date), 'HH:mm', { locale: es })} hrs
                                        </p>
                                        <button
                                            className='ml-4 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600'
                                            onClick={() => handleDeleteClick(appointment.id_consultation)} // Usar appointment.id
                                        >
                                            Borrar cita
                                        </button>
                                    </div>
                                ))
                        ) : (
                            <p className='text-center text-gray-500'>No hay citas para esta fecha.</p>
                        )
                    }
                </div>
            </div>

            {/* Confirmation Modal */}
            {showConfirm && (
                <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h2 className="text-xl font-bold mb-4">
                            ¿Estás seguro de que deseas borrar esta cita?
                        </h2>
                        <div className="flex justify-center gap-4 mt-4">
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                onClick={confirmDelete}
                            >
                                Sí, borrar
                            </button>
                            <button
                                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                                onClick={cancelDelete}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Appointments;