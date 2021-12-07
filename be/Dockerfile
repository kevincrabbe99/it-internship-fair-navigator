# copy ubuntu latest image from docker hub
FROM ubuntu:latest

# install python and pip
RUN apt-get update -y && \
    apt-get install -y python3.6 && \
    apt-get install -y python3-pip && \
    apt-get install -y python3-flask && \
    apt-get install -y build-essential && \
    apt-get install -y libffi-dev

# We copy just the requirements.txt first to leverage Docker cache
COPY ./requirements.txt /app/requirements.txt

# Set working directory of the container
WORKDIR /app

# Install application specific requirements
RUN pip3 install -r requirements.txt

# Copy '/be' to '/app' on the container
COPY . /app

ENTRYPOINT ["python3"]

# Match port in application
EXPOSE 8080

CMD [ "app.py" ]