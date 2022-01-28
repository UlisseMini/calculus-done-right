FROM python:3.9-alpine

# Make print flush stdout by default
ENV PYTHONUNBUFFERED 1

WORKDIR /server
COPY . ./

# C deps needed for poetry
RUN apk add gcc musl-dev libffi-dev
RUN pip install poetry
RUN poetry install --no-dev

CMD poetry run uvicorn --host=0.0.0.0 app.main:app
