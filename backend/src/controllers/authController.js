import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import enviarCorreo from "../helpers/email.js";
import generatePassword from "../helpers/password.js";

// Iniciar sesión
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Credenciales incorrectas" });
        }
        
        const token = jwt.sign({ userId: user.id_user }, process.env.JWT_SECRET, { expiresIn: "1h" });
        
        res.cookie("token", token, {
            httpOnly: true,
            secure: true, // Para HTTPS
            sameSite: 'none', // Importante para cross-site
            maxAge: 10800000,
            domain: '.railway.app' // Dominio principal
        });

        const userWithoutPassword = {
            ...user.toJSON(),
            password: undefined
        };

        res.json({ 
            message: "Inicio de sesión exitoso", 
            user: userWithoutPassword
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error en el inicio de sesión" });
    }
};

// Registrar usuario
const register = async (req, res) => {
    try {
        const { email, name, lastname, phone, type } = req.body;
        const existingUser = await User.findOne({ where: { email } });

        const password = generatePassword(name, email, lastname)
        // en tu endpoint POST /register
        
        if (existingUser) {
            return res.status(400).json({ message: "El usuario ya existe" });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashedPassword, name, lastname, phone, type });
        
        await enviarCorreo(email, password, name);
        res.status(201).json({ message: "Usuario registrado" , user});
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error en el registro" });
    }
};

// Cerrar sesión
const logout = (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 0,
        domain: '.railway.app',
        path: '/' // Importante especificar el path
    });
    
    res.json({ message: "Cierre de sesión exitoso" });
};

export { login, register, logout };
