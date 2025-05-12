import { RouterProvider } from 'react-router-dom'
import './App.css'
import RootLayout from './layouts/RootLayout'
import { router } from './router'
import { AuthProvider } from './contexts/AuthContext'
import { ToastContainer } from 'react-toastify'
import { AnimalsProvider } from './contexts/AnimalContext'

function App() {
  
  return (
    <>
    <AuthProvider>
      <AnimalsProvider>
        <RouterProvider router={router}/>
      </AnimalsProvider>
    </AuthProvider>
    <ToastContainer  position="top-center" />
    </>
  )
}

export default App
