# Step 1: Use Node.js for backend setup
FROM node:23.5.0-alpine AS build 

LABEL maintainer="SIRAONE"

# Build arguments for user/group configurations
ARG USER=siraone
ARG USER_ID=802
ARG USER_GROUP=siraone
ARG USER_GROUP_ID=802
ARG USER_HOME=/app
ARG MOTD='Welcome to SIRAONE'


# Install dependencies
WORKDIR /app/backend
# Install Node.js
#RUN apk add --no-cache nodejs npm
#RUN npm cache clean --force
#RUN npm install -g npm@latest

RUN npm install express nodemailer body-parser cors openai dotenv --no-audit --legacy-peer-deps

#RUN npm install express nodemailer body-parser cors openai dotenv

# Create the non-root user and group and set MOTD login message
RUN \
    addgroup -g ${USER_GROUP_ID} ${USER_GROUP} \
    && adduser -h ${USER_HOME} -u ${USER_ID} -G ${USER_GROUP} -D ${USER} \
    && echo "${MOTD}" > /etc/motd


# Set the working directory and copy files
WORKDIR ${USER_HOME}

COPY backend/ ./backend/
#COPY backend/.env ./backend/

# Debugging: Show contents of /app/backend
RUN echo "Contents of /app/backend:" && ls -l ./backend

# Change ownership and permissions
#RUN chown -R ${USER}:${USER_GROUP} ${USER_HOME}

# Step 2: Set up the frontend
FROM nginx:alpine as frontend

WORKDIR /app/frontend
COPY frontend/ ./
#USER root
# Step 3: Build the final image
FROM nginx:alpine

WORKDIR /app/frontend
COPY --from=frontend /app/frontend /usr/share/nginx/html/

# Copy the backend and entrypoint script
COPY --from=build /app/backend /app/backend
COPY entry/siraone-entrypoint.sh /app/siraone-entrypoint.sh
#--chown=siraone:siraone 
# Ensure entrypoint script is executable
#RUN chown 802:802 /app/siraone-entrypoint.sh
RUN chmod +x /app/siraone-entrypoint.sh

# Create necessary Nginx cache directories with correct permissions
#RUN mkdir -p /var/cache/nginx/client_temp && \
 #   chown -R 802:802 /var/cache/nginx

# Expose the necessary ports
EXPOSE 8080 80

# Set the entrypoint
ENTRYPOINT ["sh","/app/siraone-entrypoint.sh"]