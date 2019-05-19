FROM nginx:1.15.2-alpine

# Copy Nginx config
COPY ./config/nginx.conf /etc/nginx/nginx.conf

# Copy static files
COPY ./build /var/www

# Explicit port
EXPOSE 80

# Explicit entrypoint
ENTRYPOINT ["nginx","-g","daemon off;"]
