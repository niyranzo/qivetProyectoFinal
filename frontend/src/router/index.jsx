// importaciones
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import { ROUTES } from "./path";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Admin from "../pages/admin/Admin";
import User from "../pages/User";
import ProtectedRoute from "../components/ProtectedRouter";
import Animal from "../pages/animal/Animal";
import Diagnostic from "../pages/animal/Diagnostic";
import Analysis from "../pages/animal/Analysis";
import Vaccination from "../pages/Vaccination";
import Register from "../pages/admin/Register";
import Edit from "../pages/admin/Edit";
import NewAnimal from "../pages/admin/NewAnimal";
import UserAnim from "../pages/admin/UserAnim";
import Consultation from "../pages/admin/Consultation";
import DiagnosisUpload from "../pages/admin/DiagnosisUpload";
import AnalysisUpload from "../pages/admin/AnalysisUpload";
import History from "../pages/admin/History";
import Appointments from "../pages/admin/Appoinments";
import PublicRouter from "../components/PublicRouter";
// const url = import.meta.env.VITE_API_URL;
// const pokemonUrl = import.meta.env.VITE_POKEMON;



export const router = createBrowserRouter([
    { //cada uno es una ruta
        element:<RootLayout />,
        errorElement:<ErrorPage />,
        children: [ 
            {
                path: ROUTES.HOME, // === "/"
                element: 
                <PublicRouter>
                    <Home />
                </PublicRouter>
            },
            {
                path: ROUTES.CONTACT, 
                element:
                <PublicRouter>
                    <Contact />
                </PublicRouter>
                
            },
            {
                path: ROUTES.LOGIN, 
                element: 
                <PublicRouter>
                    <Login />
                </PublicRouter>
            },
            {
                path: ROUTES.ADMIN, 
                element: 
                <ProtectedRoute admin={true}>       
                    <Admin />
                </ProtectedRoute>,
            },
            {
                path: ROUTES.REGISTER,
                element: 
                // <ProtectedRoute admin={true}>       
                    <Register />
                // </ProtectedRoute>,
            },
            {
                path: ROUTES.USER,
                element: 
                <ProtectedRoute admin={false}>       
                    <User />
                </ProtectedRoute>
            },
            {
                path: ROUTES.ANIMAL, 
                element: 
                <ProtectedRoute admin={false}>       
                    <Animal />
                </ProtectedRoute>,
            },
            {
                path: ROUTES.DIAGNOSTIC, 
                element: 
                <ProtectedRoute admin={false}>       
                    <Diagnostic />
                </ProtectedRoute>,
            },
            {
                path: ROUTES.ANALYSIS, 
                element: 
                <ProtectedRoute admin={false}>       
                    <Analysis />
                </ProtectedRoute>,
            },
            {
                path: ROUTES.VACCINATION, 
                element: 
                <ProtectedRoute admin={false}>       
                    <Vaccination />
                </ProtectedRoute>,
            },
            {
                path: ROUTES.EDIT, 
                element: 
                <ProtectedRoute admin={false}>       
                    <Edit />
                </ProtectedRoute>
            },
            {
                path: ROUTES.NEWANIMAL, 
                element: 
                <ProtectedRoute admin={true}>       
                    <NewAnimal />
                </ProtectedRoute>,
            },
            {
                path: ROUTES.USERANIM, 
                element: 
                <ProtectedRoute admin={true}>       
                    <UserAnim />
                </ProtectedRoute>,
            },
            {
                path: ROUTES.CONSULTATION, 
                element: 
                <ProtectedRoute admin={true}>       
                    <Consultation />
                </ProtectedRoute>,
            },
            {
                path: ROUTES.DIAGNOSTICNEW, 
                element: 
                <ProtectedRoute admin={true}>       
                    <DiagnosisUpload />
                </ProtectedRoute>,
            },
            {
                path: ROUTES.ANALYSISNEW,
                element:
                <ProtectedRoute admin={true}>       
                    <AnalysisUpload /> 
                </ProtectedRoute>,
            },
            {
                path: ROUTES.HISTORY,
                element:
                <ProtectedRoute admin={true}>       
                    <History /> 
                </ProtectedRoute>,
            },
            {
                path: ROUTES.APPOINTMENT,
                element:
                <ProtectedRoute admin={true}>       
                    <Appointments /> 
                </ProtectedRoute>,
            }
            
        ]
    },
]);