FROM node

# WORKDIR /testapp

ENV MONGO_DB_USERNAME=admin \
    MONGO_DB_PWD=qwerty

RUN mkdir -p testapp

COPY . /testapp

# Application port
EXPOSE 5050

# Install dependencies inside Docker
# RUN npm install

CMD ["node", "/testapp/server.js"]


# FROM node

# ENV MONGO_DB_USERNAME=admin \
#     MONGO_DB_PWD=qwerty

# RUN mkdir -p testapp

# COPY . /testapp

# CMD ["node", "/testapp/server.js"]