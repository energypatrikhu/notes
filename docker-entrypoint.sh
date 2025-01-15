#!/bin/sh
set -e

# Change to the app directory
cd /opt/app

# Initialize the MariaDB Tables
echo "Initializing MariaDB Tables..."
npm run prisma:push

# Start the Notes Server
echo "Starting Notes Server..."
exec "$@"