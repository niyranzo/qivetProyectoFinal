// importaciones
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import { ROUTES } from "./path";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Admin from "../pages/Admin";
import User from "../pages/User";
import ProtectedRoute from "../components/ProtectedRouter";
import Animal from "../pages/Animal";
import Diagnostic from "../pages/Diagnostic";
import Analysis from "../pages/Analysis";
import Vaccination from "../pages/Vaccination";
// const url = import.meta.env.VITE_API_URL;
// const pokemonUrl = import.meta.env.VITE_POKEMON;



export const router = createBrowserRouter([
    { //cada uno es una ruta
        element:<RootLayout />,
        errorElement:<ErrorPage />,
        children: [ 
            {
                path: ROUTES.HOME, // === "/"
                element: <Home />
            },
            {
                path: ROUTES.CONTACT, 
                element: <Contact />
            },
            {
                path: ROUTES.LOGIN, 
                element: <Login />
            },
            {
                path: ROUTES.LOGIN, 
                element: <Login />
            },
            {
                path: ROUTES.ADMIN, 
                element: 
                <ProtectedRoute admin={true}>       
                    <Admin />
                </ProtectedRoute>
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
            }
        //     {
        //         path: ROUTES.POKEMON_DETAILS, // === "/search"
        //         element: <PokemonDetailPage />,
        //         errorElement:<ErrorPage />,
        //         //loader: permite hacer un fect directamente en la ruta
        //         loader: async ({ params }) => {
        //             // hago el fetch del value para la busqueda del pokemon
        //             const response = await fetch(`${url}${pokemonUrl}/${params.name}`);
        //             if(!response.ok){
        //                 throw new Error("Pokemon not found");
        //             }
        //             return await response.json();
        //         } 
        //     },
        //     {
        //         path: ROUTES.ABOUT, // === "/search"
        //         element: <AboutPage />
        //     },
        ]
    },
]);