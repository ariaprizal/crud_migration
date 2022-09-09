const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import Routes Writer
require("./app/routes/writer.routes")(app);
// Import Routes Article
require("./app/routes/article.routes")(app);
  
// set port, listen for requests
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

