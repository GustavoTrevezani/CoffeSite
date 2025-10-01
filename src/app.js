// configura o express da aplicação, como ele irá funcionar
import express from "express";
import coffeeRoutes from "./routes/coffeeRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
app.use(express.json());

app.use("/coffee", coffeeRoutes);
app.use("/user", userRoutes);

export default app;
