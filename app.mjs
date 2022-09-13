import express, { json, urlencoded } from 'express';
const app = express();
import bodyParser from "body-parser";

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(bodyParser.json())


// IMport Routes Writer
import {routeWriter} from "./app/routes/writer.routes.mjs";
app.use('/api/writers', routeWriter);

// Import Routes Article
import {routeArticle} from "./app/routes/article.routes.mjs";
app.use('/api/article',routeArticle);

// set port, listen for requests
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

