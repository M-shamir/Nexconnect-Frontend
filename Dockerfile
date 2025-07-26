FROM node:20

WORKDIR /app

# Use correct path relative to build context
COPY Nexconnect/package*.json ./
RUN npm install

COPY Nexconnect . 
CMD ["npm", "run", "dev", "--", "--host"]
