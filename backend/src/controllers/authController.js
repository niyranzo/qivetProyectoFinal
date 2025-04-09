import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

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
            secure: process.env.NODE_ENV === "production",
            maxAge: 3600000,
            sameSite: "strict"
        });
        
        res.json({ message: "Inicio de sesión exitoso" });
    } catch (error) {
        res.status(400).json({ message: "Error en el inicio de sesión" });
    }
};

// Registrar usuario
const register = async (req, res) => {
    try {
        const { email, password, name, lastname, phone, type } = req.body;
        const existingUser = await User.findOne({ where: { email } });
        
        if (existingUser) {
            return res.status(400).json({ message: "El usuario ya existe" });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashedPassword, name, lastname, phone, type });
        
        res.status(201).json({ message: "Usuario registrado" });
    } catch (error) {
        res.status(400).json({ message: "Error en el registro" });
    }
};

// Cerrar sesión
const logout = (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 0,
    });
    res.json({ message: "Cierre de sesión exitoso" });
};

export { login, register, logout };
