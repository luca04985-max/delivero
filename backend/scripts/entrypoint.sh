#!/bin/sh
# Entrypoint wrapper: run seed-on-start if DB empty, then start server

echo "🔧 Running seed-on-start check..."
./scripts/seed-on-start.sh

echo "🚀 Starting backend server..."
exec npm start