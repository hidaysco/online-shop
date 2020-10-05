FROM node:10

WORKDIR usr/app

COPY package*.json ./

RUN npm install

COPY . .
RUN npm run build-ts
EXPOSE ${PORT}

CMD ["npm", "start"]