import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "qivetlacaleratfg@gmail.com", // debe ser qivetlacaleratfg@gmail.com
    pass: "gjpy usuk egvw eeui"  // contraseña de aplicación
  }
});

async function enviarCorreo(destinatario, password, name) {
  try {
    const info = await transporter.sendMail({
      from: `QIVET <qivetlacaleratfg@gmail.com>`,
      to: destinatario,
      subject: 'Tu contraseña generada',
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
            <h2 style="color: #4CAF50;">¡Bienvenido/a a QIVET, ${name}!</h2>
            <p>Gracias por confiar en nosotros. Hemos generado una contraseña para que puedas acceder a tu cuenta:</p>
            <p style="font-size: 18px; font-weight: bold; color: #000;">🔐 ${password}</p>
            <br>
            <p>Si tienes alguna duda, no dudes en contactarnos.</p>
            <p style="margin-top: 20px;">Saludos,<br><strong>El equipo de QIVET</strong></p>
        </div>
        `
    });

    console.log('Correo enviado:', info.messageId);
  } catch (error) {
    console.error('Error enviando el correo:', error);
  }
}

export default enviarCorreo;
