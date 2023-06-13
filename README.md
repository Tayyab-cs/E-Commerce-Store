# E-Commerce Store Backend
This is the documentation for the E-Commerce Store backend, which is built using Node.js, Express, and Sequelize. This backend provides the necessary APIs and functionality to support the operations of an E-Commerce Store.

## Features
The E-Commerce Store backend offers the following features:

* User Authentication: Allows users to register, log in, and manage their accounts.
* Product Management: Provides APIs to create, read, update, and delete products.
* Order Management: Allows users to place orders and manage their orders.
* Category Management: Provides APIs to create, read, update, and delete product categories.
* Payment Integration: Integrates with a payment gateway to process payments for orders.
* User Authorization: Implements role-based access control to restrict access to certain APIs based on user roles.

## Technology Stack
The E-Commerce Store backend is built using the following technologies:

* Node.js: A JavaScript runtime for executing server-side code.
* Express: A fast and minimalist web framework for Node.js.
* Sequelize: An ORM (Object-Relational Mapping) library for interacting with the database.
* MySQL: The chosen database management system for storing data.
* JSON Web Tokens (JWT): Used for user authentication and authorization.
* JOI: Used for Schema Validation.
* bcrypt: Used for password Hashing.
* multer: Used for uploading files/images to the project.
* AWS S3: Used for uploading files/images to cloud.
* NodeMailer: Used for sending mails.
* Stripe: Used for payment integration.

## Project Structure
The project structure of the E-Commerce Store backend follows a modular approach:

```
├── config/         # Configuration files (database, authentication, etc.)
├── controller/     # Request handlers for each route
├── database/       # Database models
    └── models
├── dbSeed/         # Pre-functions for initial process
├── middlewares/    # Custom middleware functions
├── routes/         # API routes
├── services/       # Business logic and data manipulation
├── utils/          # Utility functions and helpers
    └── helper
├── validation/     # Validation Objects for Requested Data
├── server.js       # Entry point of the application
├── package.json    # Project dependencies and scripts
```

## Installation
To set up and run the E-Commerce Store backend on your local machine, follow these steps:

1. Clone the repository: `git clone https://github.com/Tayyab-cs/E-Commerce-Store.git`.
2. Navigate to the project directory.
3. Install the dependencies: `npm install` or `npm i`.
4. Set up the database by configuring the database connection in `config/config.js`.
5. Create `.env` file and set the Environment Variables.
6. Start the server: `npm start`.

## API Documentation
The API documentation for the E-Commerce Store backend can be found in the [API Documentation](https://api.postman.com/collections/12306298-5b3a4aba-29b4-4181-87f7-992c68aa0867?access_key=PMAT-01H25WVSGYJ1BBNS9QKWBMDVWP) file.

## Conclusion
The E-Commerce Store backend provides a robust foundation for building an E-Commerce application. It leverages Node.js, Express, and Sequelize to offer essential features like user authentication, product and order management, cart functionality, and more.

For detailed information on the APIs and how to use them, please refer to the API Documentation file.

Feel free to reach out to the development team for any further assistance or inquiries.

Happy coding! 😃

