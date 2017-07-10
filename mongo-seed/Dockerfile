FROM mongo
RUN mkdir /dump

COPY db/dump /dump
ENTRYPOINT mongod
CMD mongorestore --host rishighanangular_mongodb_1 --drop -d rishighan /dump/rishighan