function generatePassword({ name, email, lastname, phone }) {
  const base =
    (name?.slice(0, 1) || '') +
    (lastname?.slice(0, 1) || '') +
    (email?.slice(0, 1) || '') +
    (phone?.slice(-2) || '');

  const longitud = 8;
  const caracteres = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

  let aleatorio = '';
  for (let i = 0; i < longitud; i++) {
    const randomChar = caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    aleatorio += randomChar;
  }

  // Mezclar base y aleatorio, y cortar a longitud final
  const combinacion = (base + aleatorio)
    .split('')
    .sort(() => Math.random() - 0.5) // mezcla los caracteres
    .join('')
    .slice(0, longitud);

  return combinacion;
}

export default generatePassword;