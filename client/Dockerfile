FROM nginx:stable-alpine
ENV REACT_APP_SERVER_BASE_URL https://i8a705.p.ssafy.io/api
RUN echo $REACT_APP_SERVER_BASE_URL
WORKDIR /usr/share/nginx/html
# Copy the built React app to the working directory
COPY build .
# Copy the Nginx configuration file to the appropriate location
COPY client/nginx/nginx.conf /etc/nginx/conf.d/default.conf
RUN rm /etc/nginx/conf.d/default.conf
COPY client/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]