import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({children, admin}) => {
  const {user, token, loading} = useAuth();
  console.log(user, token)

  if (loading) {
    return <div className='mt-400'>Cargando...</div>; // o un spinner elegante
  }

   if (!user) {
    return <Navigate to="/" replace />;
  }

  if (admin && user.type !== "admin") {
    return <Navigate to="/user" replace />;
  }
  
  return (
    <>
        {children}
    </>
  )
}

export default ProtectedRoute