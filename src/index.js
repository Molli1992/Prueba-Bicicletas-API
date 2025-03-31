import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import chargeData from "./chargeData.js";
import productsRoutes from "./routes/products.route.js";
import userRoutes from "./routes/users.route.js";
import cartRoutes from "./routes/cart.routes.js";
import orderRoutes from "./routes/orders.routes.js";
import emailRoutes from "./routes/email.routes.js";
import { PORT } from "./config.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());
chargeData();
app.use("/api", productsRoutes);
app.use("/api", userRoutes);
app.use("/api", cartRoutes);
app.use("/api", orderRoutes);
app.use("/api", emailRoutes);

app.listen(PORT);
console.log(`Server running on port ${PORT}`);
