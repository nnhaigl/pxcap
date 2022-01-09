# Image source
FROM node:14

# Install ffmpeg
RUN apt-get update -qq && apt-get install -y ffmpeg

# Docker working directory
WORKDIR /app

# Copying file into APP directory of docker
COPY ./package.json /app/

# Then install the NPM module
RUN npm install

# Copy current directory to APP folder
COPY . /app/

EXPOSE 5555
CMD ["npm", "start"]