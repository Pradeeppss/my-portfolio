FROM node:18.18.0

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 5173

CMD [ "npm", "run", "dev" ]