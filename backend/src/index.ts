import express from "express";
import cors from "cors";
import router from "./routes/routes.js";
import errorMiddleware from "./middleware/error.middleware.js";

import { connection } from "./infrastructure/database/index.js";

const app = express();
app.use(express.json());
app.use(cors({ origin: "*", credentials: true }));

app.use(router);
app.use(errorMiddleware);

await connection();

app.listen(3030, "0.0.0.0", () => {
  console.log("старт");
});
