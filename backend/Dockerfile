FROM python:latest

RUN mkdir build

WORKDIR /build

COPY . .

RUN pip install --no-cache-dir --upgrade -r requirements.txt

EXPOSE 80

WORKDIR /build/app

CMD uvicorn main:app --reload --host 0.0.0.0 --port 80

