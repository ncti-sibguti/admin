# базовый образ
FROM node:14.16.1-alpine3.10

# создаем директорию приложения
WORKDIR /app

# копируем package.json и package-lock.json (если есть)
COPY package*.json ./

# устанавливаем зависимости
RUN npm install

# копируем файлы приложения
COPY . .

# собираем приложение в production mode
RUN npm run build

# создаем nginx сервер и копируем собранное приложение
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html

# копируем конфигурационный файл nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# запускаем nginx
CMD ["nginx", "-g", "daemon off;"]
