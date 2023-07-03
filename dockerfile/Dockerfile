FROM harbor.senthink.com/base/node:16
WORKDIR /app
COPY build build
COPY dockerfile/server.js .
CMD ["node","server.js"]
