FROM node:22-alpine AS frontend

WORKDIR /app
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend ./
RUN npm run build

FROM nginx:1.27-alpine

COPY --from=frontend /app/dist /usr/share/nginx/html
COPY --from=frontend /app/node_modules/swagger-ui-dist/swagger-ui.css /usr/share/nginx/html/docs/
COPY --from=frontend /app/node_modules/swagger-ui-dist/swagger-ui-bundle.js /usr/share/nginx/html/docs/
COPY openapi.yaml /usr/share/nginx/html/docs/openapi.yaml
COPY docker/nginx/docs.html /usr/share/nginx/html/docs/index.html
COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf
