# QR code generator

Application generates QR code after uploading an image with its respective content (name/title, description and raw image itself).

## Application composition

The application consists of a frontend, backend and database. All are based on Node.js apart from the database
which is a NO-SQL mongo database.

The frontend is written using React.js (16+) using ES6, and HTML + CSS.
The backend consists of JavaScript (Node.js), and popular frameworks such as express, passport among others. The backend mainly
deals with terminating the endpoint request and writing actions for them.
Mongo database is hosted on [cloud.mongodb.com](https://cloud.mongodb.com/).

Currently, the app doesn't use Typescript.

## Getting started (configure Node and Git)

- have **Node.js** installed on your machine. Install node [here](https://nodejs.org/en/download/). Node comes with
  npm (package manager) needed for executing commands in order to install, and run the app.
- have **Git** installed. Follow instructions [here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

## Download repository and run the app

After setting up Git and Node (npm included) open your Terminal/Command Prompt.

1.  clone the repository to your computer: `git clone https://github.com/eugensunic/qr-code-poc.git`
2.  for installing the backend go inside the directory/folder _qr-code-poc/backend_ (folder must contain package.json) and run: `npm install`.
3.  for installing the frontend go inside the directory/folder _qr-code-poc/fe-cms_ (folder must contain package.json) and run: `npm install`.
4.  execute `npm run start` for both frontend and backend (separately)

The backend will run on port 5000 and frontend on port 3000. Once the backend starts, it will automatically contact the database and connect to it.

In order to generate bundle files for the frontend (React compilation to native JavaScript) run `npm run build`.
Webpack will output the following chunks:

 
 build/static/js/2.30e0c262.chunk.js
 build/static/js/main.908befd7.chunk.js
 build/static/css/main.3f13f869.chunk.css
 build/static/js/runtime-main.dde129a3.js


 All of them need to be added to index.html file in order for the app tu run successfully

   ```
   <script src="/static/js/bundle.js"></script>
   <script src="/static/js/0.chunk.js"></script>
   <script src="/static/js/main.chunk.js"></script>
   <script src="/main.c4c29cd266b188f69f0d.hot-update.js"></script>
   ```




