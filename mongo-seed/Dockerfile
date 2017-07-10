FROM mongo
RUN mkdir /dump

COPY db/dump /dump
CMD mongod; mongorestore --drop -d rishighan /dump