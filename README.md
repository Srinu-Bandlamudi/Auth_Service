# Welcome to Auth Service

## Project Setup

1. **Clone the project on your local machine**
   - Clone this repository: `[Auth_Service](https://github.com/Srinu-Bandlamudi/Auth_Service)`

2. **Install dependencies**
   - Execute `npm install` in the root directory after cloning the repository.

3. **Environment Setup**
   - Create a `.env` file in the root directory and add the following environment variables:
     ```plaintext
     PORT=3001
     JWT_KEY=srinu
     ```
   - Inside the `src/config` folder, create a file `config.json` with the following content:
     ```json
     {
       "development": {
         "username": "root",
         "password": "tarak@9999",
         "database": "AUTH_DB_DEV",
         "host": "127.0.0.1",
         "dialect": "mysql"
       }
     }
     ```

4. **Database Setup**
   - Once you've added your DB config as listed above, navigate to the `src` folder from your terminal and execute:
     ```bash
     npx sequelize db:create
     ```
   - Then, execute the migration command:
     ```bash
     npx sequelize db:migrate
     ```

## Database Design

- **Tables:**
  - User
  - Role
  - User_Roles (Join Table)

- **User Model:**
  - Manages user credentials and associations with roles.
  - Fields:
    - `email`: The email address of the user.
    - `password`: The encrypted password of the user.
  - Associations:
    - A User belongs to many Roles through the `User_Roles` table.

- **Role Model:**
  - Defines the various roles available in the system.
  - Fields:
    - `name`: The name of the role (e.g., ADMIN, CUSTOMER, AIRLINE_BUSINESS).
  - Associations:
    - A Role belongs to many Users through the `User_Roles` table.

- **Seeding Data:**
  - The initial roles (ADMIN, CUSTOMER, AIRLINE_BUSINESS) are seeded into the database.

  ```bash
  npx sequelize db:seed:all
