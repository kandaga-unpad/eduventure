FROM node:18

WORKDIR /srv/www/eduventure

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install

COPY . .

RUN mv .env.example .env

RUN pnpm build

EXPOSE 5170

CMD ["sh", "start.sh"]