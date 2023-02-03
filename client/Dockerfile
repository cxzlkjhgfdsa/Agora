FROM nginx:stable-alpine
# env
ENV REACT_APP_SERVER_BASE_URL https://i8a705.p.ssafy.io/api
WORKDIR /app
RUN mkdir ./build
ADD ./client/build ./build
RUN rm /etc/nginx/conf.d/default.conf
COPY ./client/nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]