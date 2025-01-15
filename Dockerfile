FROM node:current-alpine

ENV PORT=80
ENV DATABASE_URL="mysql://root:notes-psw@db:3306/notes-db"

WORKDIR /opt/app


COPY package.json .
RUN npm install

COPY build build
COPY prisma prisma
COPY static static
COPY docker-entrypoint.sh .
RUN chmod -f +x ./*.sh

EXPOSE 80

ENTRYPOINT ["/opt/app/docker-entrypoint.sh"]


CMD [ "node", "build/index.js" ]
