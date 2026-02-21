#!/bin/sh
# Entrypoint wrapper: run schema verification and demo data seeding, then start server

echo " Running database schema verification..."
node scripts/ensure-db-schema.js

echo " Running demo data seeding..."
node scripts/seed-demo-data.js

echo " Starting backend server..."
exec npm start