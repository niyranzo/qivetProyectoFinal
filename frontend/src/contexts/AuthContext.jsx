import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";  // Importar el toast
const API_URL = import.meta.env.VITE_API_URL;

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth se debe usar dentro de un contexto");
    }
    return context;
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [token, setToken] = useState();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const res = await fetch(`${API_URL}user/me`, {
                    method: "GET",
                    credentials: "include", // importante para enviar cookie
                });
                if (res.ok) {
                    const data = await res.json();
                    setUser(data);
                }
            } catch (err) {
                console.error("Error al recuperar usuario", err.message);
            } finally {
                setLoading(false); // ← ¡aquí lo marcamos como listo!
            }
        };
        fetchCurrentUser();
    }, []);

    const register = async ({ email, password }) => {
        try {
            const response = await fetch(`${API_URL}auth/register`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            if (!response.ok) {
                if (response.status === 400) {
                    setError("Ya hay un usuario registrado con ese usuario");
                    toast.error("Ya hay un usuario registrado con ese usuario", {
                        style: { background: 'red', color: 'white' }
                    });
                } else {
                    setError("Hubo un problema al intentar registrarse.");
                    toast.error("Hubo un problema al intentar registrarse.", {
                        style: { background: 'red', color: 'white' }
                    });
                }
                return;
            }
            const data = await response.json();
            console.log(data)
            setUser(data.user);
            setToken(data.token);
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            toast.success("¡Registro exitoso!.", {
                style: { background: 'green', color: 'white' }
            });
            return data.success;
        } catch (error) {
            console.error(error.message);
            setError(error);
            toast.error("Error en el registro, intente de nuevo.", {
                style: { background: 'red', color: 'white' }
            });
        }
    };

    const login = async (formData) => {
        const { email, password } = formData;
        try {
            const response = await fetch(`${API_URL}auth/login`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                if (response.status === 401) {
                    setError("Credenciales incorrectas. Intenta de nuevo.");
                    toast.error("Credenciales incorrectas. Intenta de nuevo.", {
                        style: { background: 'red', color: 'white' },
                    });
                } else {
                    setError("Hubo un problema al intentar iniciar sesión.");
                    toast.error("Hubo un problema al intentar iniciar sesión.", {
                        style: { background: 'red', color: 'white' }
                    });
                }
                return;
            }
            const data = await response.json();
            setUser(data.user);
            localStorage.setItem("user", JSON.stringify(data.user));
           toast.success(`Bienvenido ${data.user.name}`, {
                style: { background: 'purple', color: 'white' }
            });
            return data.user;
        } catch (error) {
            console.error("Error en la petición", error);
            toast.error("Error al intentar iniciar sesión, por favor intenta de nuevo.", {
                style: { background: 'red', color: 'white' }
            });
        }
    };

    const logout = async () => {
        try {
            const logoutUser = await fetch(`${API_URL}auth/logout`, { 
                method: 'POST',
                credentials: 'include', // importante para enviar cookie
            })
            if (!logoutUser.ok) {
                setError("Hubo un problema al intentar cerrar sesión.");
                toast.error("Hubo un problema al intentar cerrar sesión.", {
                    style: { background: 'red', color: 'white' }
                });
                return;
            }
            setUser(null);
            toast.info("Has cerrado sesión correctamente.", {
                style: { background: "purple", color: 'white' }
            });
        } catch (error) {
            console.error("Error al cerrar sesión", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, token, error, loading, login, logout, register, setError }}>
            {children}
        </AuthContext.Provider>
    );
};
