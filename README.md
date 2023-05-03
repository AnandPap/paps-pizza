# Pap's Pizza

### This version is an example of full MERN app deployed on vercel.com:

#### "master" branch deployed live version: https://paps-pizza-vercel-full.vercel.app/ (ctrl + click to open in new tab)

### While this one, on the other hand, contains just frontend while server is deployed on render.com:

#### "render.com" branch deployed live version: https://paps-pizza-render.vercel.app/ (ctrl + click to open in new tab)

## To get a local copy up and running follow these steps:

### 1. Clone the repository

`git clone https://github.com/AnandPap/paps-pizza.git`

### 2. Open client folder in your terminal which is located inside paps-pizza folder and run `npm i` to install NPM packages then run `npm run dev` while still inside client folder to start the frontend side of the project.

### 3. Next, open server folder and create `.env` file inside of it with following variable: `MONGO = "connection_string"` where connection_string is mongoDB URI that you get when you create and connect to your own mongo cluster. If the aformentioned variable isn't provided, fallback will be used.

### 4. After that run `npm i` while still inside server folder to install NPM packages then run `npm run dev` to start the backend side of the project.

### 4. Open http://localhost:5173 to view it in the browser.

### 5. Have fun exploring Pap's Pizza app!
