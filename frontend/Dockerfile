FROM node:23

WORKDIR /app
COPY . .
RUN npm install && npm run build

# 使用 nginx 作为静态服务器
FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html
EXPOSE 80
