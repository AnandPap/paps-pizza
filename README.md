# Pap's Pizza

## Basic featuers of this pizza ordering app are:

#### 1. Sign up, log in, change password or delete profile (CRUD operations)

#### 2. Create and order desired pizza on provided address

#### 3. Review history of previous orders

### Technologies used in this project:

#### 1. **React**, with **Typescript** and packages:

- _vite_ for bootstrapping project
- _react-router_ for routing purposes
- _react-redux_ with _@reduxjs/toolkit_ for state management
- _axios_ for making easier HTTP requests to server and response handling

#### 2. **Node.js**, with **Typescript** and packages:

- **_Express_** as Node.js web application framework
- _mongoose_ as MongoDB object modeling tool
- _bcrypt_ for password hashing
- _jsonwebtoken_ for jwt creation and verification

#### 3. **MongoDB**, using _MongoDB Compass_ GUI as a tool for analyzing _MongoDB_ data

#### 4. **Postman** for testing backend routes

### This is an example of full MERN app deployed on vercel.com:

#### "master" branch deployed live version: https://paps-pizza-vercel-full.vercel.app/

### To get a local copy up and running, follow these steps:

#### 1. Clone the repository: `git clone https://github.com/AnandPap/paps-pizza.git`

#### 2. Open client folder in your terminal, located inside paps-pizza folder, and run `npm install` to install NPM packages. Then, run `npm run dev` to start the frontend side of the project.

#### 3. Next, open server folder and create `.env` file inside of it with the following variable: `MONGO = "connection_string"` where connection_string is MongoDB URI that you get when you create and connect to your own Mongo cluster. If the aforementioned variable isn't provided, the fallback value found in the config.js file will be used.

#### 4. After that, run `npm install` while still inside the server folder to install NPM packages and then run `npm run dev` to start the backend side of the project.

#### 5. Open http://localhost:5173 to view it in the browser.

#### 6. Have fun exploring Pap's Pizza app!
