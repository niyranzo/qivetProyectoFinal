import { RouterProvider } from 'react-router-dom'
import './App.css'
import RootLayout from './layouts/RootLayout'
import { router } from './router'

function App() {
  
  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
