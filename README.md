# nodejs-ts-starter-mongo

This is a starter project for building a Node.js application using TypeScript and MongoDB. It includes essential features and configurations to help you get started quickly.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Scripts](#scripts)
- [Environment Variables](#environment-variables)
- [Testing](#testing)
- [License](#license)

## Features

- **TypeScript**: Strongly typed programming language that builds on JavaScript.
- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB**: NoSQL database for storing application data.
- **Mongoose**: Elegant MongoDB object modeling for Node.js.
- **Jest**: Delightful JavaScript testing framework with a focus on simplicity.
- **Supertest**: Super-agent driven library for testing HTTP servers.
- **dotenv**: Module to load environment variables from a `.env` file.
- **Winston**: A logger for just about everything.
- **Express Validator**: A set of express.js middlewares that wraps validator.js validator and sanitizer functions.

## Getting Started

### Prerequisites

- Node.js (>= 14.x)
- npm (>= 6.x)
- MongoDB (>= 4.x)

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/dpxcode/nodejs-ts-starter-mongo.git
    cd nodejs-ts-starter-mongo
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add the following environment variables:

    ```env
    PORT=3000
    MONGO_URL=mongodb://localhost:27017/your-database
    ```

4. Start the development server:

    ```sh
    npm run dev
    ```

## Project Structure

```plaintext
.
├── src
|   ├── config
|   |   ├── v1
│   │   |   └── mongo.ts
|   |   └── database.ts
|   ├── helpers
|   |   └── v1 
│   │       └── response.helper.ts      
│   ├── middlewares
│   │   └── v1
│   │       └── error.ts
│   ├── resources
│   │   └── v1
│   │       └── user
│   │           ├── user.controller.ts
│   │           ├── user.model.ts
│   │           ├── user.resource.ts
│   │           ├── user.route.ts
│   │           └── user.validation.ts
│   ├── startup
│   │   ├── index.ts
│   │   ├── models.ts
│   │   └── routes.ts
|   ├── utils
|   |   └── v1
│   │       └── firebase.ts 
├── tests
│   ├── v1
│   │   └── user
│   │       ├── user.controller.test.ts
│   │       ├── user.model.test.ts
│   │       ├── user.resource.test.ts
│   │       └── user.validation.test.ts
├── .env
├── jest.config.js
├── package.json
├── tsconfig.json
├── README.md
└── index.ts


