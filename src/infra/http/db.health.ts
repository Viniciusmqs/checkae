import { Router } from 'express';
import { prisma } from '../../config/prisma';

export const dbHealthRouter = Router();

dbHealthRouter.get('/db/health', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ db: 'ok' });
  } catch (e: any) {
    res.status(500).json({ db: 'error', error: String(e?.message ?? e) });
  }
});
