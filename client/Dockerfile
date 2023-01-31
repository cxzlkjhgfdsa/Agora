FROM node:14-alpine as builder

ENV REACT_APP_SERVER_BASE_URL i8a705.p.ssafy.io:9999/api/

WORKDIR /app

COPY client/package.json .

RUN npm install

COPY client/. .

RUN npm run build

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]