#!/bin/bash

cleanup() {
  docker compose -f docker-compose.dev.yml down
}

trap cleanup EXIT

docker compose -f docker-compose.dev.yml up
