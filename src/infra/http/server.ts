import "dotenv/config";
import express from "express";
import cors from "cors";
import { json } from "express";
import { consultasRouter } from "../../modules/consultas/consultas.routes";
import { dbHealthRouter } from './db.health';
import { swaggerRouter } from './swagger';

const app = express();

app.use(cors());
app.use(json());
app.use(dbHealthRouter);
app.use(swaggerRouter);

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "checkae-api" });
});

// rotas de negócio do Checkaê
app.use("/consultas", consultasRouter);

const port = process.env.PORT || 3333;

app.listen(port, () => {
  console.log(`Checkaê API running on port ${port}`);
});
