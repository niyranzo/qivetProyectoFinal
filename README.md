# QIVET - Sistema de Gestión Veterinaria 🐾

## Descripción

QIVET es una aplicación web completa para la gestión de una clínica veterinaria, desarrollada con tecnologías modernas. Permite administrar pacientes, historiales médicos, vacunaciones y citas.

## Tecnologías Utilizadas 🛠️

### Backend
- **Node.js** con Express
- **PostgreSQL** con Sequelize ORM
- **JWT** para autenticación
- **Multer** para manejo de archivos
- **Nodemailer** para envío de correos

### Frontend
- **React** + Vite
- **TailwindCSS** para estilos
- **React Router** para navegación
- **Context API** para estado global

## Características Principales ✨

### Gestión de Usuarios
- Registro y autenticación
- Roles (admin/usuario)
- Cambio de contraseña seguro

### Gestión de Mascotas
- Registro de mascotas
- Historial médico
- Fotografías
- Documentos adjuntos

### Historial Clínico
- Diagnósticos por imagen
- Análisis de sangre
- Registro de vacunaciones
- Próximas citas

### Panel Administrativo
- Gestión de usuarios
- Administración de mascotas
- Control de citas
- Reportes médicos

## Instalación 📦

### 1. Clonar el repositorio
```bash
git clone https://github.com/niyranzo/qivetProyectoFinal.git
cd QIVET-TFG
```

### 2. Configurar variables de entorno
    
#### Backend (.env)
```env
DB_HOST=postgres
DB_PORT=5432
DB_NAME=qivet_db
DB_USER=admin
DB_PASSWORD=admin
JWT_SECRET=tu_secreto_jwt_seguro
```

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000/api/
```

### 3. Iniciar con Docker
```bash
docker-compose up -d
```

## Estructura del Proyecto 📁

```
QIVET-TFG/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── middleware/
│   └── public/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── context/
│   └── public/
└── docker-compose.yml
```

## Endpoints API 🔗

### Auth
- `POST /api/auth/login`
- `POST /api/auth/register`
- `POST /api/auth/logout`

### Users
- `GET /api/user/me` - Obtener perfil del usuario autenticado
- `GET /api/user` - Obtener todos los usuarios
- `GET /api/user/:id` - Obtener usuario por ID
- `PATCH /api/user/:id` - Actualizar usuario
- `DELETE /api/user/:id` - Eliminar usuario

### Animals
- `POST /api/animals` - Crear nueva mascota
- `GET /api/animals/user/:id_user` - Obtener mascotas por usuario
- `GET /api/animals/:id` - Obtener mascota por ID
- `PUT /api/animals/:id` - Actualizar mascota
- `DELETE /api/animals/:id` - Eliminar mascota

### Analysis
- `GET /api/analysis/animal/:id_animal` - Obtener análisis por mascota
- `GET /api/analysis/:id_analysis` - Obtener análisis por ID
- `POST /api/analysis` - Crear nuevo análisis
- `DELETE /api/analysis/:id_analysis` - Eliminar análisis

### Consultations
- `POST /api/consultation` - Crear nueva consulta
- `GET /api/consultation` - Obtener todas las consultas
- `GET /api/consultation/reserved-dates` - Obtener fechas de citas reservadas
- `GET /api/consultation/animal/reserved-dates` - Obtener fechas reservadas con información de mascota
- `GET /api/consultation/:id` - Obtener consulta por ID
- `PUT /api/consultation/:id` - Actualizar consulta
- `DELETE /api/consultation/:id` - Eliminar consulta
- `POST /api/consultation/:id/add-vaccine` - Agregar vacuna a consulta
- `POST /api/consultation/:id/set-next-visit` - Programar próxima visita
- `PATCH /api/consultation/:id/next-visit` - Eliminar próxima visita
- `GET /api/consultation/animal/:id_animal` - Obtener todas las consultas por mascota
- `GET /api/consultation/animal/:id_animal/last` - Obtener última consulta por mascota

### Diagnostics
- `GET /api/diagnostic/animal/:id_animal` - Obtener diagnósticos por mascota
- `GET /api/diagnostic/:id_diagnostic` - Obtener diagnóstico por ID
- `POST /api/diagnostic` - Crear nuevo diagnóstico
- `DELETE /api/diagnostic/:id_diagnostic` - Eliminar diagnóstico

### Vaccinations
- `POST /api/vaccination` - Crear nueva vacunación
- `GET /api/vaccination/:id` - Obtener vacunación por ID
- `GET /api/vaccination/animal/:id_animal` - Obtener vacunaciones por mascota
- `PUT /api/vaccination/:id` - Actualizar vacunación
- `DELETE /api/vaccination/:id` - Eliminar vacunación

### Upload
- `POST /api/upload/image` - Subir imagen
- `POST /api/upload/pdf` - Subir archivo PDF

### Static Files
- `GET /api/images/*` - Servir archivos de imagen
- `GET /api/pdfs/*` - Servir archivos PDF

## Autor ✍️

**Nicole Yranzo Ghisolfi    **

---

*Desarrollado como Trabajo de Fin de Grado*