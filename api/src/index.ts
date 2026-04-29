import express from "express";
import ordersRouter from "./routes/orders";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "bridgekeeper-api" });
});

app.use("/orders", ordersRouter);

app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
