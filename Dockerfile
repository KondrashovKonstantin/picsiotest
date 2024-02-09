FROM node:20.7.0
WORKDIR /usr/src/app
COPY . .
RUN npm install
CMD ["npm", "start"]