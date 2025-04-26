# Subscription Tracker API

A backend API designed to manage user subscriptions, built with a focus on security, scalability, and maintainability.

## Features

- **Rate Limiting and Bot Protection**: Implements advanced request limiting and security measures to protect against abuse.
- **Database Modeling**: Structured database schemas and relationships using MongoDB and Mongoose.
- **Authentication and Authorization**: Secure user authentication with JWT, supporting user CRUD operations and subscription management.
- **Global Error Handling**: Centralized error handling with input validation and middleware support.
- **Logging and Monitoring**: Built-in logging mechanisms to aid in debugging and application monitoring.
- **Automated Email Reminders**: Scheduled workflows for sending subscription renewal reminders to users.
- **Clean Code Architecture**: Modular, reusable code structure following best practices for scalability and ease of maintenance.

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- Nodemailer (for email notifications)

## Project Structure

<!--
```
/src
  /config
  /controllers
  /middlewares
  /models
  /routes
  /services
  /utils
```

- `config/`: Application configuration files
- `controllers/`: Route logic and request handlers
- `middlewares/`: Custom middlewares for validation, authentication, and error handling
- `models/`: Mongoose models and schema definitions
- `routes/`: API route definitions
- `services/`: Business logic, external service integrations
- `utils/`: Helper functions and utilities -->

## Setup Instructions

1. Clone the repository
2. Install dependencies
   ```
   npm install
   ```
3. Create a `.env` file with the necessary environment variables (example provided in `.env.example`)
4. Run the development server
   ```
   npm run dev
   ```

## Future Improvements

- Admin panel for managing users and subscriptions
- Payment integration for premium subscriptions
- Webhook support for real-time subscription updates
- Improved analytics and reporting
