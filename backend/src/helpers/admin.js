// scripts/createAdmin.js
import bcrypt from 'bcryptjs';
import User from '../models/User.js';


export const createAdminUser = async () => {
    try {
        const adminEmail = 'admin@qivet.com';
        const adminPassword = 'admin';
        const adminName = 'Admin';
        const adminLastname = 'User';
        const adminPhone = '123456789'; 

        // Buscar si el usuario administrador ya existe
        const existingAdmin = await User.findOne({ where: { email: adminEmail } });

        if (!existingAdmin) {
            // Hashear la contraseña antes de guardarla
            const hashedPassword = await bcrypt.hash(adminPassword, 10);

            // Crear el usuario administrador
            await User.create({
                type: 'admin', // Según tu ENUM 'user', 'admin'
                name: adminName,
                lastname: adminLastname,
                email: adminEmail,
                phone: adminPhone,
                password: hashedPassword,
                changePassword: false // Lo establecemos a false si lo creamos como admin por defecto
            });
            console.log(`Usuario administrador "${adminEmail}" creado exitosamente.`);
        } else {
            console.log(`El usuario administrador "${adminEmail}" ya existe. No se realizaron cambios.`);
        }
    } catch (error) {
        console.error('❌ Error al crear/verificar el usuario administrador:', error);
        // Es importante salir con un código de error para que Docker Compose lo detecte
    }
};

