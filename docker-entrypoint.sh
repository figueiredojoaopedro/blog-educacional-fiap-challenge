#!/bin/sh
set -e

# Wait for MongoDB to be ready
# It uses netcat to check for the mongo port
until nc -z -v -w30 ${MONGO_HOST} ${MONGO_PORT}; do
  echo "Waiting for MongoDB to be ready..."
  sleep 5
done

echo "MongoDB is ready."

# Execute the main command
exec "$@"
