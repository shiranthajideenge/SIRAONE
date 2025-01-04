echo "Starting Node server and nginx" >&2
cd /app/backend >&2
apk add --no-cache nodejs npm >&2
node /app/backend/server.js & nginx -g 'daemon off;'