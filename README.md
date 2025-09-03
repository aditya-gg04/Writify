# Writify - Note Taking Application

A clean and simple note-taking application built with Spring Boot and React that helps you organize your thoughts and ideas.

## Features

- 📝 Create, edit and delete notes
- 🔐 User authentication
- 💫 Clean and intuitive interface
- 📱 Responsive design

## Setup Guide

### Prerequisites

- Java 17
- Node.js and npm
- MySQL

### Backend Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/writify.git
cd writify
```

2. **Configure MySQL**
```properties
# server/src/main/resources/application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/writify
spring.datasource.username=your_username
spring.datasource.password=your_password
```

3. **Run Spring Boot application**
```bash
cd server
mvn spring-boot:run
```

### Frontend Setup

1. **Install dependencies and run**
```bash
cd client
npm install
npm start
```

The app will be available at `http://localhost:3000`

## Tech Stack

- **Backend**: Spring Boot, MySQL
- **Frontend**: React
- **Authentication**: JWT


## License

MIT License

