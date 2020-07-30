FROM node:12-slim
# docker build -f Dockerfile -t sebohe/wcstress .

RUN apt update && apt install git -y
WORKDIR /app
ENV PATH /app/node_modules/.bin/:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm i
COPY . .
RUN npm run bootstrap
RUN npm run build

CMD ["npm", "run", "health-check"]
