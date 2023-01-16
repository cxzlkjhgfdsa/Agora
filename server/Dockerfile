#FROM openjdk:11-jdk
#COPY build/libs/*.jar app.jar
#ENTRYPOINT ["java", "-jar", "app.jar"]


FROM adoptopenjdk:11-hotspot AS builder
ENV USE_PROFILE dev
COPY server/gradlew .
COPY server/gradle gradle
COPY server/build.gradle .
COPY server/settings.gradle .
COPY server/src src
RUN chmod +x ./gradlew
RUN ./gradlew bootJar

FROM adoptopenjdk:11-hotspot
COPY --from=builder build/libs/*.jar app.jar

EXPOSE 8888
ENTRYPOINT ["java","-jar","-Dspring.profiles.active=${USE_PROFILE}","/app.jar"]
