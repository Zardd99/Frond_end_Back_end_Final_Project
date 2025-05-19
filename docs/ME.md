# Font-Family: Novecento Sans

# Get images

- docker images --format "{{.ID}}\t{{.Repository}}\t{{.Tag}}\t{{.CreatedAt}}" | sort -k4

# Build Docker images

- docker build -t myapp .

# Run with new image

- docker run -p 5173:5173 myapp
