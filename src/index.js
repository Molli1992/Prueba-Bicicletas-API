import express from "express";
import cors from "cors";
import { PORT } from "./config.js";
import productsRoutes from "./routes/products.route.js";

const app = express();
app.use(cors());

app.use("/api", productsRoutes);

app.listen(PORT);
console.log("Server running on port " + PORT);
