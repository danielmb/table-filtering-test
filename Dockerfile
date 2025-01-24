FROM node:23-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --force 

COPY . .

CMD ["npm", "start"]

