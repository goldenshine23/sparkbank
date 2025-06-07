# Use official OpenJDK 17 image as base
FROM openjdk:17-jdk-slim

# Set working directory inside the container
WORKDIR /app

# Copy the built jar from your local target folder to the container
COPY sparkbank/target/sparkbank.jar app.jar

# Expose the port your app runs on (Spring Boot default is 8080)
EXPOSE 8080

# Set a placeholder environment variable for the API key (optional)
ENV TMDB_API_KEY=""

# Run the jar file; the app can access TMDB_API_KEY as an env var
ENTRYPOINT ["java", "-jar", "app.jar"]
