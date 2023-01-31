# FROM node:14-alpine as builder
# ENV REACT_APP_SERVER_BASE_URL i8a705.p.ssafy.io:9999
# RUN mkdir /app
# WORKDIR /app
# COPY client/package.json /app/package.json
# RUN npm install --silent
# RUN npm install react-scripts@2.1.3 -g --silent

# # 소스를 작업폴더로 복사하고 빌드
# COPY client/. .
# RUN npm run build

# FROM nginx:1.13.9-alpine
# # nginx의 기본 설정을 삭제하고 앱에서 설정한 파일을 복사
# RUN rm -rf /etc/nginx/conf.d
# COPY client/conf /etc/nginx

# # 위에서 생성한 앱의 빌드산출물을 nginx의 샘플 앱이 사용하던 폴더로 이동
# COPY --from=builder /app/build /usr/share/nginx/html

# # 80포트 오픈하고 nginx 실행
# EXPOSE 80 443
# CMD ["nginx", "-g", "daemon off;"]

FROM node:14-alpine AS builder

WORKDIR /app
# package.json 워킹 디렉토리에 복사 (.은 설정한 워킹 디렉토리를 뜻함)
COPY client/package.json .
# 명령어 실행 (의존성 설치)
RUN npm install
# 현재 디렉토리의 모든 파일을 도커 컨테이너의 워킹 디렉토리에 복사한다.
COPY client/. .



# 3000번 포트 노출
EXPOSE 3000

# npm start 스크립트 실행
CMD ["npm", "start"]
