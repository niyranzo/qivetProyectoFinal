import React, { useEffect, useRef, useState } from 'react';
import Spinner from '../../components/Spinner';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/Auth/useAuth';
import { useAdmin } from '../../hooks/Admin/useAdmin';

const Admin = () => {
  const { user } = useAuth(); // Asumiendo que `user` del AuthContext es el admin logueado
  const { getUsers, loader, deleteUser } = useAdmin();

  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openActionsId, setOpenActionsId] = useState(null);
  const menuRefs = useRef({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getUsers();
        // Filtramos aquí los usuarios para mostrar solo los de tipo 'user'
        const regularUsers = fetchedUsers.filter(u => u.type === 'user');
        setUsers(regularUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [getUsers]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      const menuRef = menuRefs.current[openActionsId];
      if (menuRef && !menuRef.contains(e.target)) {
        setOpenActionsId(null);
      }
    };

    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, [openActionsId]);

  const handleDelete = (userToDelete) => { // Renombrado para evitar conflicto con `user` del AuthContext
    setSelectedUser(userToDelete);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteUser(selectedUser.id_user);
      setUsers(prev => prev.filter(u => u.id_user !== selectedUser.id_user));
      setShowConfirm(false);
      setSelectedUser(null);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setSelectedUser(null);
  };

  const filteredUsers = users.filter((u) => {
    const fullName = `${u.name} ${u.lastname}`.toLowerCase();
    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className='mt-40 flex flex-col items-center'>
      <div className='mb-5'>
        <h1 className='text-4xl font-bold mb-2'>Página Administrador</h1>
        <hr className='bg-gradient-to-r from-pinkLigth to-aquamarine h-2 border-0 rounded-2xl w-100'/>
      </div>
      <p className='text-2xl font-semibold mb-10'>{`${user.name} ${user.lastname}`}</p>
      <Link to="/admin/appointments" className='border-2 cursor-pointer my-5 md:mt-0 border-purple-500 rounded-xl p-2 hover:bg-purple-500 hover:text-white transition duration-300'>
          Ver Próximas Citas
      </Link>
      <div className='flex items-center md:justify-around w-150 flex-col md:flex-row'>
        <div className='border-2 border-purple-500 rounded-lg pl-2 pr-4 py-2 flex items-center justify-start'>
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Buscar usuario..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-2 outline-none w-full bg-transparent"
          />
        </div>
        <Link to="/admin/register" className='border-2 cursor-pointer mt-5 md:mt-0 border-purple-500 rounded-xl p-3 md:mr-13 hover:bg-purple-500 hover:text-white transition duration-300'>
          Dar Alta Usuario
        </Link>
      </div>

      {loader ? (
        <Spinner />
      ) : (
        <div className='flex w-full justify-around mt-10 flex-wrap gap-6 mb-40'>
          {filteredUsers.length === 0 ? (
            <p className="text-xl text-gray-600 text-center w-full">
              No se encontró ningún usuario con ese nombre o email.
            </p>
          ) : (
            filteredUsers.map((userItem) => ( // Renombrado a userItem para evitar conflicto con `user` del AuthContext
              <div
                className='flex flex-col w-sm max-w-sm items-center rounded-xl shadow-lg shadow-gray-500 py-5 px-4 bg-white break-words'
                key={userItem.id_user}
              >
                {/* Ajuste del grid para mejor visualización */}
                <div className='grid grid-cols-2 gap-x-4 gap-y-4 w-full'> {/* Aumentado el gap-x */}
                  <div className='flex flex-col items-center text-center'>
                    <p className='text-xl font-bold'>Nombre</p>
                    <p>{userItem.name} {userItem.lastname}</p>
                  </div>
                  <div className='flex flex-col items-center text-center'>
                    <p className='text-xl font-bold'>Email</p>
                    {/* Clase `break-all` o `break-words` para el email largo */}
                    <p className='break-all'>{userItem.email}</p>
                  </div>
                  <div className='col-span-2 flex flex-col items-center text-center'>
                    <p className='text-xl font-bold'>Teléfono</p>
                    <p>{userItem.phone}</p>
                  </div>
                </div>

                {/* Menú Acciones */}
                <div className="relative mt-3" ref={el => menuRefs.current[userItem.id_user] = el}>
                  <button
                    className='border-2 border-purple-500 rounded-xl p-3 hover:bg-purple-500 hover:text-white transition duration-300'
                    onClick={() =>
                      setOpenActionsId(prev => prev === userItem.id_user ? null : userItem.id_user)
                    }
                  >
                    Acciones
                  </button>

                  {openActionsId === userItem.id_user && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-56 bg-purple-100 text-black rounded-xl shadow-lg z-10 mt-2">
                      <div className="flex flex-col p-2 space-y-2">
                        <Link
                          to={`/admin/user/${userItem.id_user}/animals`}
                          className="text-left font-bold hover:bg-purple-200 cursor-pointer px-3 py-2 rounded transition duration-300"
                        >
                          Gestionar Mascotas
                        </Link>
                        <Link
                          to={`/admin/edit/${userItem.id_user}`}
                          className="text-left hover:bg-purple-200 cursor-pointer px-3 py-2 rounded transition duration-300"
                        >
                          Editar Usuario
                        </Link>
                        <Link
                          to={`/admin/newAnimal/${userItem.id_user}`}
                          className="text-left hover:bg-purple-200 cursor-pointer px-3 py-2 rounded transition duration-300"
                        >
                          Añadir nueva Mascota
                        </Link>
                        <button
                          className="text-left hover:bg-red-300 cursor-pointer px-3 py-2 rounded transition duration-300 text-red-700"
                          onClick={() => handleDelete(userItem)}
                        >
                          Borrar Usuario y Mascotas
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Modal de confirmación */}
      {showConfirm && selectedUser && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4">
              ¿Estás seguro de que deseas borrar al usuario <span className="text-purple-600">{selectedUser.name} {selectedUser.lastname}</span>?
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

export default Admin;