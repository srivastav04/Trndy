FROM node:24-slim

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

EXPOSE 4001

CMD ["npm", "start"]
