import { Router, Request, Response } from "express";
import { orders } from "../data/seed";

const router = Router();

router.get("/:id", (req: Request, res: Response) => {
  const orderId = parseInt(req.params.id, 10);

  if (isNaN(orderId)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return res.status(404).json({ error: "Pedido não encontrado" });
  }

  return res.json(order);
});

router.get("/", (req: Request, res: Response) => {
  const rawUserId = req.headers["x-user-id"];
  const userId = rawUserId ? parseInt(rawUserId as string, 10) : null;

  if (!userId) {
    return res.status(401).json({ error: "Header x-user-id obrigatório" });
  }

  const userOrders = orders.filter((o) => o.userId === userId);
  return res.json(userOrders);
});

export default router;
