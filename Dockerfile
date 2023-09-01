# syntax=docker/dockerfile:1
FROM node:18-alpine
WORKDIR /app
COPY . ./
RUN npm install
CMD npm run start -- --host 0.0.0.0