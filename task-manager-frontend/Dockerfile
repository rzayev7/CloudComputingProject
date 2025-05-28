# Use a lightweight Nginx image
FROM nginx:alpine

# Remove default Nginx welcome page
RUN rm -rf /usr/share/nginx/html/*

# Copy your static assets from the html directory to Nginx's webroot
COPY ./html/ /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# Command to run Nginx
CMD ["nginx", "-g", "daemon off;"] 