# Spring Boot 설정

```yaml
# application-prod.yml

spring:
    config:
        activate:
            on-profile: prod
    redis:
        host: ${redishost}
        port: 6379
        password: ${redispass}
    gcp:
        config:
            file: gcp-account-file.json
        project:
            id: agora-374311
        bucket:
            id: agora_real1
        dir:
            name: img
    mvc:
        pathmatch:
            matching-strategy: ant_path_matcher
    datasource:
        url: jdbc:mysql://${database.hostname}:3306/${database.schema}?serverTimezone=UTC&useUnicode=true&characterEncoding=utf8
        username: ${database.username}
        password: ${database.password}
        driver-class-name: com.mysql.cj.jdbc.Driver
    jpa:
        hibernate:
            ddl-auto: none
        properties:
            hibernate:
                format_sql: true
                default_batch_fetch_size: 100
    security:
        oauth2:
            client:
                registration:
                    google: # /oauth2/authorization/google 이 주소를 동작하게 한다.
                        client-id: 344895362990-l0ap8aav03aj2tjh5q51d3flbh7bku8a.apps.googleusercontent.com
                        client-secret: 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
                        redirect-uri: "https://i8a705.p.ssafy.io/api/oauth2/callback/google"
                        scope:
                            - email
                            - profile

                    # 네이버는 OAuth2.0 공식 지원대상이 아니라서 provider 설정이 필요하다.
                    # 요청주소도 다르고, 응답 데이터도 다르기 때문이다.
                    naver:
                        client-id: d39k8QR1ywTWTqrjqaqw
                        client-secret: f4Kml8hAaE
                        scope:
                            - name
                            - email
                            - profile_image
                        client-name: Naver # 클라이언트 네임은 구글 페이스북도 대문자로 시작하더라.
                        authorization-grant-type: authorization_code
                        redirect-uri: https://i8a705.p.ssafy.io/api/oauth2/callback/naver

                    kakao:
                        client-id: 43afb3401ff629234879d5984661dec0
                        redirect-uri: https://i8a705.p.ssafy.io/api/oauth2/callback/kakao
                        client-authentication-method: POST
                        client-secret: dmV9BsEaNVrnZswvFwZG0N2pHBASDRPG
                        authorization-grant-type: authorization_code
                        scope:
                            - profile_nickname
                            - profile_image
                        client_name: kakao

                provider:
                    naver:
                        authorization-uri: https://nid.naver.com/oauth2.0/authorize
                        token-uri: https://nid.naver.com/oauth2.0/token
                        user-info-uri: https://openapi.naver.com/v1/nid/me
                        user-name-attribute: response # 회원정보를 json의 response 키값으로 리턴해줌.
                    kakao:
                        authorization-uri: https://kauth.kakao.com/oauth/authorize
                        token-uri: https://kauth.kakao.com/oauth/token
                        user-info-uri: https://kapi.kakao.com/v2/user/me
                        user-name-attribute: id

server:
    port: 8081
#management:
#  endpoint:
#    health:
#      show-details: always
openvidu:
    hostname: ${meeting.hostname}
    secret: ${meeting.secret}
```

-   개발 환경과 운영 환경의 설정 파일을 분리
-   운영 환경에서 민감한 변수들은 AWS안의 docker-compose.yml에서 정의

# Spring Boot Build

```dockerfile
FROM adoptopenjdk:11-hotspot AS builder
# env
ENV USE_PROFILE dev
ENV HOST_NAME localhost
ENV SCHEMA localagora
ENV USERNAME root
ENV PASSWORD 1234
ENV JWT_SECRET slfjlskdfjslkf
ENV REDISHOST AGORA
ENV REDISPASS redispass
ENV MEETING_HOST HOST
ENV MEETING_SECRET SECRET
# env finish
COPY server/gradlew .
COPY server/gradle gradle
COPY server/build.gradle .
COPY server/settings.gradle .
COPY server/src src
RUN chmod +x ./gradlew
RUN ./gradlew clean compileQuerydsl
RUN ./gradlew clean bootJar

FROM adoptopenjdk:11-hotspot
COPY --from=builder build/libs/*.jar app.jar

EXPOSE 8081
ENTRYPOINT ["java","-jar","-Dspring.profiles.active=${USE_PROFILE}", "-Ddatabase.hostname=${HOST_NAME}", "-Ddatabase.schema=${SCHEMA}", "-Ddatabase.username=${USERNAME}", "-Ddatabase.password=${PASSWORD}", "-Djwt.secret=${JWT_SECRET}", "-Dredishost=${REDISHOST}", "-Dredispass=${REDISPASS}", "-Dopenvidu.hostname=${MEETING_HOST}", "-Dopenvidu.secret=${MEETING_SECRET}", "/app.jar"]
```

-   Spring Boot 빌드를 위한 Dockerfile
-   QueryDSL을 사용하기 때문에 QeuryDSL 빌드 실행
-   빌드 시 환경 변수를 사용해 빌드
-   docker-compose.yml에 환경 변수 지정
