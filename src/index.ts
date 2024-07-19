// it looks into .env file and grad required variables
import * as dotenv from "dotenv";
dotenv.config();

// this code shows how tedious is to implement API from scratch
// server run --> node <file-path>
// import http from 'http'
import app from './server';

// const server = http.createServer(async (req, res) => {
//   if (req.url === "/" && req.method === "GET") {
//     res.writeHead(200, { "Content-Type": "application/json" });
//     res.write(JSON.stringify({ message: "hello" }));

//     res.end();
//     return;
//   }

//   res.writeHead(404, { "Content-Type": "application/json" });
//   res.end(JSON.stringify({ message: "ERROR!" }));
// });

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`server on ${PORT}`);
});