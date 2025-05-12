import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";
const API_URL = import.meta.env.VITE_API_URL;

export const useAnimals = () => {
    const context = useContext(AnimalsContext);
    if (!context) {
        throw new Error("useAnimals se debe usar dentro de un contexto");
    }
    return context;
};

export const AnimalsContext = createContext();

export const AnimalsProvider = ({ children }) => {
    const { user } = useAuth();
    const [animals, setAnimals] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

   useEffect(() => {
        const getAnimalsUser = async () => {
            try {
                const response = await fetch(`${API_URL}animals/user/${user.id_user}`, {
                    method: 'GET',
                    credentials: 'include' 
                }) 
            
                if (!response.ok) {
                    throw new Error("Error al obtener los animales del usuario");
                }
                const data = await response.json();
                setAnimals(data);
            } catch (error) {
                console.error(error.message);
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        getAnimalsUser();
    }, [user]);

    const getAnimal = async (id) => {
        try {
            const response = await fetch(`${API_URL}animals/${id}`, {
                method: 'GET',
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error("Error al obtener el animal");
            }
            return await response.json();
        } catch (error) {
            console.error(error.message);
            setError(error);
        } finally {
            setLoading(false);
        }
    }
    
    const getDiagnostics = async (idAnimal) => {
        try {
            const response = await fetch(`${API_URL}diagnostic/animal/${idAnimal}`, {
                method: 'GET',
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error("Error al obtener los diagnósticos");
            }
            return await response.json();
        } catch (error) {
            console.error(error.message);
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    const getAnalysis = async (idAnimal) => {
        try {
            const response = await fetch(`${API_URL}analysis/animal/${idAnimal}`, {
                method: 'GET',
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error("Error al obtener los analisis");
            }
            return await response.json();
        } catch (error) {
            console.error(error.message);
            setError(error);
        } finally {
            setLoading(false);
        }
    }

      const getVaccination = async (idAnimal) => {
        try {
            const response = await fetch(`${API_URL}vaccination/animal/${idAnimal}`, {
                method: 'GET',
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error("Error al obtener las vacunas");
            }
            return await response.json();
        } catch (error) {
            console.error(error.message);
            setError(error);
        } finally {
            setLoading(false);
        }
    }


    return (
        <AnimalsContext.Provider value={{ animals, getAnimal, loading, getDiagnostics, getAnalysis, getVaccination }}>
            {children}
        </AnimalsContext.Provider>
    );
};
