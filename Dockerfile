FROM maven:3.9.9-eclipse-temurin-17

RUN mkdir -p /home/.m2 /home/app \
    && chown -R 1000:1000 /home

WORKDIR /home/app

USER 1000

CMD [ "mvn", "-Duser.home=/home", "quarkus:dev", "-Ddebug", "-DdebugHost=0.0.0.0"]