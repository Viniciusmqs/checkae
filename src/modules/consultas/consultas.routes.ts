import { Router } from 'express';
import { prisma } from '../../config/prisma';
import { processaConsultaAsync } from './consultas.service';

export const consultasRouter = Router();

// LISTAR últimas 20
consultasRouter.get('/', async (_req, res, next) => {
  try {
    const items = await prisma.consulta.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
    });
    res.json(items);
  } catch (e) { next(e); }
});

// CRIAR
consultasRouter.post('/', async (req, res, next) => {
  try {
    const { placa, cpfCnpj } = req.body ?? {};
    if (!placa || !cpfCnpj) {
      return res.status(400).json({ message: 'placa e cpfCnpj são obrigatórios' });
    }
    const consulta = await prisma.consulta.create({
      data: { placa: String(placa).toUpperCase(), cpfCnpj: String(cpfCnpj), status: 'PROCESSANDO' },
    });
    processaConsultaAsync(consulta.id).catch(() => {});
    res.status(202).json({ consultaId: consulta.id, status: consulta.status });
  } catch (e) { next(e); }
});

// BUSCAR por id
consultasRouter.get('/:id', async (req, res, next) => {
  try {
    const consulta = await prisma.consulta.findUnique({
      where: { id: req.params.id },
      include: { debitos: true, eventos: true },
    });
    if (!consulta) return res.status(404).json({ message: 'consulta não encontrada' });
    res.json(consulta);
  } catch (e) { next(e); }
});

// reprocessar (mock) uma consulta existente
consultasRouter.post('/:id/refresh', async (req, res, next) => {
  try {
    const { id } = req.params;
    const found = await prisma.consulta.findUnique({ where: { id } });
    if (!found) return res.status(404).json({ message: 'consulta não encontrada' });

    await prisma.consulta.update({ where: { id }, data: { status: 'PROCESSANDO' } });
    // dispara de novo
    import('./consultas.service').then(m => m.processaConsultaAsync(id));
    res.status(202).json({ id, status: 'PROCESSANDO' });
  } catch (e) { next(e); }
});

// paginação/filtragem simples
consultasRouter.get('/', async (req, res, next) => {
  try {
    const take = Math.min(Number(req.query.take ?? 20), 100);
    const skip = Number(req.query.skip ?? 0);
    const placa = (req.query.placa as string | undefined)?.toUpperCase();

    const where = placa ? { placa } : undefined;

    const [items, total] = await Promise.all([
      prisma.consulta.findMany({ where, orderBy: { createdAt: 'desc' }, take, skip }),
      prisma.consulta.count({ where })
    ]);

    res.json({ total, items });
  } catch (e) { next(e); }
});


