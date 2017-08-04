FROM mongo:latest

COPY mongo-seed/db/dump /home/dump
COPY mongo-seed/mongo.sh /home/mongo.sh
RUN chmod 777 /home/mongo.sh

CMD /home/mongo.sh