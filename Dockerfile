# Usar una imagen base de Node.js
FROM node:20.14.0

# Configurar directorio de trabajo
WORKDIR /app

# Copiar los archivos del proyecto
COPY . /app

# Instalar dependencias del proyecto
RUN npm install

# Construir el proyecto para producción
RUN npm run build

# Usar una imagen base de NGINX para servir los archivos
FROM nginx:1.21-alpine
COPY --from=0 /app/build /usr/share/nginx/html

# Exponer el puerto del servidor web (NGINX corre en 80 por defecto)
EXPOSE 80
