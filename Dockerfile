# Создаем образ на основе node image
FROM node:14.16.1-alpine3.13 AS build

# Установка рабочей директории
WORKDIR /app

# Установка зависимостей
COPY package*.json ./
RUN npm install

# Копирование кода приложения
COPY . .

ENV REACT_APP_API_URL=/api

# Сборка приложения
RUN npm run build

# Создание образа nginx
FROM nginx:1.21.0-alpine

# Копирование конфигурационного файла nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Копирование собранного приложения из образа node
COPY --from=build /app/build /usr/share/nginx/html

# Запуск nginx
CMD ["nginx", "-g", "daemon off;"]
