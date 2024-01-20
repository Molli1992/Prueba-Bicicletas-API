import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import chargeData from "./chargeData.js";
import productsRoutes from "./routes/products.route.js";
import userRoutes from "./routes/users.route.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());
chargeData();
app.use("/api", productsRoutes);
app.use("/api", userRoutes);

app.listen(3001);
console.log("Server running on port 3001");
