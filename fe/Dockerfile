# copy node 14 image from docker hub
FROM node:14

# set working directory to /usr/src
WORKDIR /usr/src

# set env PATH var
ENV PATH /node_modules/.bin:$PATH

# copy package.json & package-lock.json into /usr/src
COPY package.json ./
COPY package-lock.json ./

# install dependencies
RUN npm install
RUN npm install react-scripts@3.4.1 -g
RUN npm install serve -g

# copy '/fe' to '/usr/src'
COPY . .

# expose ReactJS port
EXPOSE 3000

# Create production build (build uses GCP env vars)
RUN npm run build
# State webserver to serve /build folder
CMD serve -s build -l 3000