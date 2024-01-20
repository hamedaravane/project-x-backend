# Purple Project

Help businesses to find perfect influencer.

## Getting Started

These instructions will help you get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (version <= 18)
- Yarn 4 (berry)
- MySQL

### Installing

1. Clone the repository:

   ```bash
   git clone https://github.com/hamedaravane/project-x-backend.git
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Yarn Tools for project:
   Good practice to check these for better experience with yarn:
   ```bash
   yarn dlx @yarnpkg/doctor
   ```
   ```bash
    yarn dlx @yarnpkg/sdks base
   ```

4. Create a `environment` directory in the root of the project.

5. Create the following files inside the `environment` directory:

    - `.env.development.local`
    - `.env.development`

6. Configure your MySQL connection in the created environment files.

### Running

Run the following commands to start the project:

```bash
yarn run start:dev
```

## Database Integration

Make sure you have MySQL installed and configured. Adjust the connection details in the `.env.development.local` and `.env.development` files.

## Code Style and Linting

This project uses ESLint for code linting and Prettier for code formatting. The configuration can be found in the `eslintrc.json` file.

## Packages Used

- [NestJS](https://nestjs.com/)
  A progressive Node.js framework for building efficient, scalable, and enterprise-grade server-side applications.
- [Typescript](https://www.typescriptlang.org/)
  A superset of JavaScript that adds static types to the language, enhancing code maintainability and readability.
- [Jest](https://jestjs.io/)
  A delightful JavaScript testing framework with a focus on simplicity and flexibility.
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
  A library for hashing passwords, providing a secure way to store user credentials.
- [UUID](https://www.npmjs.com/package/uuid)
  A library for generating universally unique identifiers (UUIDs) based on the RFC 4122 standard.
- [Class Validator](https://www.npmjs.com/package/class-validator)
  A package for object validation and transformation, particularly useful for validating data received from clients.
- [MySQL](https://www.npmjs.com/package/mysql)
  A Node.js driver for MySQL databases, enabling communication between the application and MySQL server.
- [TypeORM](https://typeorm.io/)
  An Object-Relational Mapping (ORM) library that simplifies database interactions by using TypeScript or JavaScript.

## Author

Hamed Arghavan

## License

This project is licensed under the MIT License.
