    FROM node:18-alpine

RUN mkdir -p /home/bot/app
RUN addgroup -S bot && adduser -S bot -G bot

WORKDIR /home/bot/app

COPY package*.json ./

RUN npm set strict-ssl false
RUN npm install -g @swc/cli @swc/core
RUN yarn install

COPY --chown=bot:bot . .

RUN npm run build

USER bot

EXPOSE 8081

CMD [ "npm","start" ]
