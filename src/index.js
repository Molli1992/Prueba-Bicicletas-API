import express from "express";
import cors from "cors";
import productsRoutes from "./routes/products.route.js";

const app = express();
app.use(cors());

app.use("/api", productsRoutes);

app.listen(3001);
console.log("Server running on port 3001");
