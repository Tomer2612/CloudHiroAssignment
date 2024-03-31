FROM node:14
WORKDIR /my-rest-api
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["node", "app.js"]
