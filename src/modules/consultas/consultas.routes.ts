import { Router } from "express";

export const consultasRouter = Router();

consultasRouter.post("/", (req, res) => {
  // placeholder por enquanto
  // aqui depois vamos chamar APIs externas e montar a consulta Checkaê
  res.status(202).json({
    message: "Consulta Checkaê criada. Implementação virá depois."
  });
});

consultasRouter.get("/:id", (req, res) => {
  res.status(200).json({
    message: "Detalhes da consulta Checkaê. Implementação virá depois."
  });
});
