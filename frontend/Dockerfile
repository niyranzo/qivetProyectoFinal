# Etapa 1: construir la app con Vite
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: servir con NGINX
FROM nginx:alpine

# Copiar el resultado del build al directorio que NGINX sirve
COPY --from=build /app/dist /usr/share/nginx/html

# Expone el puerto 80 (el que Railway espera)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
