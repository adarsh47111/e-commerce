import express from "express";
import { PORT } from "./config/index.js";
import connectDb from "./services/db.js";
import router from "./routers/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
app.use(express.json({ limit: "100mb" }));
app.use(router);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
  connectDb();
});
