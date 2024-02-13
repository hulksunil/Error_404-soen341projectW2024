const express = require("express");
const bodyParser = require("body-parser");
// const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const PORT = 8080;

app.use(bodyParser.json());

app.get("/mainBackend", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end("Congrats, you got node.js to run on port 3000");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(
    `Go to http://localhost:${PORT}/mainBackend to see the server running`
  );
  console.log(`Press CTRL + C to stop server`);
});
