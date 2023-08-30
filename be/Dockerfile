# 기반이 될 이미지
FROM openjdk:11
#  Docker 이미지를 빌드할 때 JAR_FILE이라는 인수를 정의하고 기본값으로 ./build/libs/*.jar를 지정
ARG JAR_FILE=./build/libs/*.jar
# 지정된 경로의 JAR 파일을 Docker 이미지 내의 app.jar로 복사
COPY ${JAR_FILE} app.jar
# Docker 컨테이너가 실행될 때 실행되는 명령
ENTRYPOINT ["java","-jar","app.jar"]
