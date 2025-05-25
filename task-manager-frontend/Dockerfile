# Use a lightweight Nginx image
FROM nginx:alpine

# Copy your static HTML/JS/CSS assets from the html subdirectory
COPY html/ /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# Default command to start Nginx
CMD ["nginx", "-g", "daemon off;"] 