# Burgeon Task Application

## Introduction

Welcome to the Burgeon Task application! This application is designed to manage user-generated content, allowing users to publish their content online. The application provides CRUD (Create, Read, Update, Delete) operations for managing posts, along with pagination and role-based access control.

## Installation

To get started with the Burgeon Task application, follow these steps:

### 1. Clone the Repository

```bash
git clone <repository-url>
```

Replace <repository-url> with the URL of the repository where your Burgeon Task application is hosted.

### 2. Navigate to the Project Directory

```bash
cd burgeontask
```

### 3. Install Dependencies

```bash

npm install
```

This command will install all the necessary dependencies specified in the package.json file.

### 4. Set Environment Variables

Create a .env file in the root directory of the project and define the following environment variables:

```plaintext

PORT=3000
MONGODB_URI=<your-mongodb-uri>
```

Replace <your-mongodb-uri> with the connection URI for your MongoDB database.

### 5. Start the Server

```bash

npm start
```

This command will start the server. By default, it will run on port 3000, but you can change the port by modifying the PORT environment variable in the .env file.

## Usage

### API Endpoints

The Burgeon Task application provides the following API endpoints:

    GET /posts: Retrieve all posts with pagination support.
    GET /posts/:id: Retrieve a specific post by its ID.
    POST /posts: Create a new post.
    PUT /posts/:id: Update an existing post by its ID.
    DELETE /posts/:id: Delete a post by its ID.
    PUT /assign-role/:userId: Assign the 'Editor' role to a user by their ID (Admin-only endpoint).

### Authentication

The application uses dummy token-based authentication.

#### Role-Based Access Control

    Users with the 'Admin' role have full access to CRUD operations and can assign the 'Editor' role to other users.
    Users with the 'Editor' role can perform CRUD operations but cannot delete posts.
    Users with the 'Viewer' role can  view and create posts but cannot update, or delete them.

## Contributing

If you would like to contribute to the development of the Burgeon Task application, please follow these guidelines:

    Fork the repository.
    Create a new branch for your feature or bug fix: git checkout -b feature-name.
    Make your changes and commit them: git commit -m 'Description of changes'.
    Push to the branch: git push origin feature-name.
    Submit a pull request detailing the changes you've made.
