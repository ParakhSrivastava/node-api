import express from 'express';
import router from './router';
import morgan from 'morgan';
import cors from 'cors';
import { protect } from './modules/auth';
import { createNewUser, signin } from "./handlers/user";

const app = express();

// middleware before routes
app.use(cors()); 
// this middleware for logs
app.use(morgan('dev'))
app.use(express.json())
// below middleware will put: google.com?a=1,b=2 --> query strings to object { a:1, b:2 }
app.use(express.urlencoded({ extended: true }))

// custom middleware 
app.use((req, res, next) => {
  req.anyKey = 'any value';
  next();
})

// only time route handler uses next() is when it needs to pass Errors to error handler
app.get('/', (req, res, next) => {
  console.log('Hello from express')

  // for async errors 
  setTimeout(() => {
    next(new Error('hello'))
  }, 1)

  res.status(200)
  res.json({ message: 'hello' })
});

app.use('/api', protect, router)

// not protected
app.post("/user", createNewUser);
app.post("/signin", signin);

// error handler (always after routes and middlewares)
app.use((err, req, res, next) => { 
  if (err.type === "auth") {
    res.status(401);
    res.json({ message: "nope" });
  } else if(err.type === 'input') {
    res.status(400).json({ message: 'invalid input' });
  } else {
    res.status(500).json({ message: 'our fault' });
  }
})

export default app;

