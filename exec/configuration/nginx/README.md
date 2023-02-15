# Nginx 설정

```shell
# /etc/nginx/conf.d/custom.conf

server {

        location / {
                proxy_pass http://localhost:3000;
        }

        location /api {
                proxy_http_version 1.1;
                proxy_pass http://localhost:8081;
        }


        location /api/oauth/google {
                proxy_pass http://localhost:8081/oauth2/authorization/google;
        }

        location /api/oauth2/callback/google {
                proxy_pass http://localhost:8081/oauth2/callback/google;
        }

        location /api/oauth/naver {
                proxy_pass http://localhost:8081/oauth2/authorization/naver;
        }

        location /api/oauth2/callback/naver {
                proxy_pass http://localhost:8081/oauth2/callback/naver;
        }

        location /api/oauth/kakao {
                proxy_pass http://localhost:8081/oauth2/authorization/kakao;
        }

        location /api/oauth2/callback/kakao {
                proxy_pass http://localhost:8081/oauth2/callback/kakao;
        }

        location ~ ^/(swagger|webjars|configuration|swagger-resources|v2|csrf) {
               proxy_pass http://localhost:8081;
               proxy_set_header Host $host;
               proxy_set_header X-Real-IP $remote_addr;
               proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
               proxy_set_header X-Forwarded-Proto $scheme;
                }

    listen 443 ssl; # managed by Certbot
    server_name i8a705.p.ssafy.io;
    ssl_certificate /etc/letsencrypt/live/i8a705.p.ssafy.io/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/i8a705.p.ssafy.io/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
        listen 80;
        server_name i8a705.p.ssafy.io;
        return 301 https://$server_name$request_uri;
}
```

-   Nginx 설정 파일을 /etc/nginx/conf.d/custom.conf에 추가
-   백엔드 SSE 사용을 위한 /api location에 Nginx version 1.1 명시
