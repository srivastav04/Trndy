FROM node:24-slim

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

EXPOSE 4002

CMD ["npm", "start"]
