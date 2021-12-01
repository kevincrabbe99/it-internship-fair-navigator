FROM ubuntu:latest

RUN apt-get update -y && \
    apt-get install -y python3.6 && \
    apt-get install -y python3-pip && \
    apt-get install -y python3-flask && \
    apt-get install -y build-essential && \
    apt-get install -y libffi-dev

# We copy just the requirements.txt first to leverage Docker cache
COPY ./requirements.txt /app/requirements.txt

WORKDIR /app

RUN pip3 install -r requirements.txt

COPY . /app

ENTRYPOINT ["python3"]

EXPOSE 8080

CMD [ "app.py" ]