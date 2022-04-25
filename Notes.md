## Node.js / Express Crash Course

### 1. Node Basics

#### Global Object

```js
// Global Object
console.log(global);

/* 
<ref *1> Object [global] {
  global: [Circular *1],
  clearInterval: [Function: clearInterval],
  clearTimeout: [Function: clearTimeout],
  setInterval: [Function: setInterval],
  setTimeout: [Function: setTimeout] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  },
  queueMicrotask: [Function: queueMicrotask],       
  clearImmediate: [Function: clearImmediate],       
  setImmediate: [Function: setImmediate] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  }
}
*/

// Can use all those methods without using .global

console.log(__dirname); //C:\Users\sebas\OneDrive\Documentos\GitHub\Node-ATOS-Practice\Net Ninja

let interval = setInterval(() => {
  console.log("Runs multiple times");
}, 3000);

setTimeout(() => {
  console.log("Only runs it 1 time");
  // Clears the interval
  clearInterval(interval);
}, 1000);
```

#### Modules and Require

_test.js_

```js
// Modules n Require

// const <whatever name you want>  = require(dir)
const peopleNames = require("./people");

/* 
If we run test.js, node is going to look for the peope.js file and
run it.

If we want to get something from people.js we have to export it,
and then peopleNames will be whatever we exported from people.js.
*/

console.log(peopleNames);
/* 
{
  people: [ 'yoshi', 'mario', 'luigi', 'toad' ],
  ages: [ 12, 34, 32, 22 ]
}
 */
```

_people.js_

```js
const people = ["yoshi", "mario", "luigi", "toad"];
const ages = [12, 34, 32, 22];

console.log(people);

// I want to export something manually from this file.
//module.exports = people;

// Want if I want to export more than 1 thing:
module.exports = {
  people: people,
  ages: ages,
};
```

What if we want to import from people using _destructuring_?

```js
// Only importing people
const { people } = require("./people");

console.log(people);

// Importing both properties
const { people, ages } = require("./people");
```

### 2. Express

#### Starting Template

```js
const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("Hello World"); // Sends a response
});

app.listen(3000);
```

##### app.method(path, handler)

##### app.get(route, callback)

- Function that tells what to do when a **GET** request at the given _route_ is called.
- The callback has 2 parameters:
  - **request(req)**: The request **object(req)** represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, etc.
  - **response(res)**: Similarly, the response **object(res)** represents the HTTP response that the Express app sends when it receives an HTTP request.

##### res.send()

This function takes an object as input and it sends this to the requesting client. Here we are sending the string "Hello World!".

##### app.listen(port, [host], [backlog], [callback]])

This function binds and listens for connections on the specified host and port. Port is the only required parameter here.

- **port**: A port number on which the server should accept incoming requests.
- **host**: Name of the domain. You need to set it when you deploy your apps to the cloud.
- **backlog**: The maximum number of queued pending connections. The default is 511.
- **callback**: An asynchronous function that is called when the server starts listening for requests.

#### Redirecting

```js
// Redirection
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});
```

#### 404 Page

```js
// Must be at the bottom of the page
app.use((req, res) => {
  res.status(404).send("404 Not Found");
});
```

_Sidenote, this function is a middleware function_

### 3. Express Middleware

Code which runs (on the server) between _getting a request_ and _sending a response_.
Runs top to bottom.

Example of a middleware function:

```js
//Simple request time logger
app.use(function (req, res, next) {
  console.log("A new request received at " + Date.now());

  next();
});
```

It's important to use the **next()** function when using middleware since we need to tell the server what to do next, since it didn't send anything to the browser.

To restrict it to a specific route (and all its subroutes), provide that route as the first argument of app.use(). For Example,

```js
//Middleware function to log request protocol
app.use("/things", function (req, res, next) {
  console.log("A request for things received at " + Date.now());
  next();
});

// Route handler that sends the response
app.get("/things", function (req, res) {
  res.send("Things");
});
```

#### 3.1 Third Party Middleware

**body-parser**
This is used to parse the body of requests which have payloads attached to them.

```js
var bodyParser = require("body-parser");

//To parse URL encoded data
app.use(bodyParser.urlencoded({ extended: false }));

//To parse json data
app.use(bodyParser.json());
```

**morgan**
HTTP request logger middleware for node.js
Sample app that will log all request in the Apache combined format to STDOUT

```js
var express = require("express");
var morgan = require("morgan");

var app = express();

app.use(morgan("combined"));

app.get("/", function (req, res) {
  res.send("hello, world!");
});
```

Others include: cookie-parser, express-session, helmet, etc.

### 4. Types of Requests

- **GET** requests to _get a resource_.
  - localhost:3000/blogs
  - localhost:3000/blogs/:id
- **POST** requests to _create a new data_ (eg. a new blog)
  - localhost:3000/blogs
- **DELETE** requests to _delete data_ (eg. delete a blog)
  - localhost:3000/blogs/:id
- **PUT** requests to _update data_ (eg. update a blog)
  - localhost:3000/blogs/:id

### 5. Route Parameters

The variable parts of the route that may change value

- localhost:3000/blogs/**:id**
- localhost:3000/blogs/**12345**

### 6. Express Router

Use the express.Router class to create modular, mountable route handlers. A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”.

```js
// birds.js file
const express = require("express");
const router = express.Router();

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});
// define the home page route
router.get("/", (req, res) => {
  res.send("Birds home page");
});
// define the about route
router.get("/about", (req, res) => {
  res.send("About birds");
});

module.exports = router;
```

```js
// app.js file
const birds = require("./birds");

// ...

app.use("/birds", birds);
```

##### Important! Node runs from top to bottom, the route order is very important and determines the order the page will run!

For example:

```js
app.get('/blogs/create')...

app.get('/blogs/:id')...

/*
  If /:id was first, when trying to access /create, it would actually try to find a blog with an id of "create".
*/
```

### 7. Controllers

A controller is the function inside the route. It can be separated into a different file and achieve MVC.

For example:

```js
// blogController.js

const blog_index = (req,res) => {
  ...
};

module.exports = {
  blog_index
}
```

```js
// blogRoutes.js
const blogController = require("./controllers/blogController");

router.get("/", blogController.blog_index);
```
