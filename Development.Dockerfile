FROM node:latest


WORKDIR /app

COPY . .

EXPOSE 3000

RUN chmod +x ./development-entrypoint.sh

ENTRYPOINT ["sh", "./development-entrypoint.sh"]
