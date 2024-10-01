FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install -g pm2

RUN npm run build

RUN npm run seed

EXPOSE 3001

CMD ["pm2-runtime", "dist/main.js"]
