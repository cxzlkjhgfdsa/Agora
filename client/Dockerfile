FROM node:14-alpine as builder

ENV REACT_APP_SERVER_BASE_URL http://i8a705.p.ssafy.io:9999/

WORKDIR /app

COPY client/package.json .

RUN npm install

COPY client/. .

RUN npm run build

FROM nginx:1.19-alpine

COPY --from=builder /app/build /usr/share/nginx/html

COPY conf/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]