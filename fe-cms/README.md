This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Run frontend

0. ```npm install``` to install dependencies from package.json
1. ```npm run build``` --> generates scripts for index.html (main.chunk.js, main.chunk.css)
   check fe-cms/build/static/js folder
2. ```npm run start``` for locally starting the app

To start the app with a prefix path run:
`HOST_PREFIX='prefix_path' npm run start`
the HOST_PREFIX variable will be filled and all the endpoints will contain the prefix (check config.js in src)
