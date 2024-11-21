FROM node:23 AS build

WORKDIR /app
COPY . /app

RUN npm install

RUN npm run build

EXPOSE 5173
ENTRYPOINT ["npm", "run", "dev", "--", "--host"]