// configura o express da aplicação, como ele irá funcionar
import express from "express";
import coffeeRoutes from "./routes/coffeeRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import foodRoutes from "./routes/foodRoutes.js";
import drinksRoutes from "./routes/drinksRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import orderItemRoutes from "./routes/orderItemRoutes.js";

const app = express();
app.use(express.json());

app.use("/coffee", coffeeRoutes);
app.use("/user", userRoutes);
app.use("/food", foodRoutes);
app.use("/drink", drinksRoutes);
app.use("/order", orderRoutes);
app.use("/orderItems", orderItemRoutes);

export default app;
