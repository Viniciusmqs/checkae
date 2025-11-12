import { Router } from 'express';
import { prisma } from '../../config/prisma';

export const consultasRouter = Router();

consultasRouter.post('/', async (req, res, next) => {
  try {
    const { placa, cpfCnpj } = req.body ?? {};
    if (!placa || !cpfCnpj) {
      return res.status(400).json({ message: 'placa e cpfCnpj são obrigatórios' });
    }

    const consulta = await prisma.consulta.create({
      data: {
        placa: String(placa).toUpperCase(),
        cpfCnpj: String(cpfCnpj),
        status: 'PROCESSANDO',
      },
    });

    // TODO: enfileirar chamadas (APIBrasil/Celcoin) e atualizar a consulta depois
    return res.status(202).json({ consultaId: consulta.id, status: consulta.status });
  } catch (err) {
    next(err);
  }
});

consultasRouter.get('/:id', async (req, res, next) => {
  try {
    const consulta = await prisma.consulta.findUnique({
      where: { id: req.params.id },
      include: { debitos: true, eventos: true },
    });
    if (!consulta) return res.status(404).json({ message: 'consulta não encontrada' });
    return res.json(consulta);
  } catch (err) {
    next(err);
  }
});
