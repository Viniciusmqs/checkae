import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { Router } from 'express';

export const swaggerRouter = Router();

const spec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: { title: 'Checkaê API', version: '1.0.0' }
  },
  apis: ['src/**/*.routes.ts']
});

swaggerRouter.use('/docs', swaggerUi.serve, swaggerUi.setup(spec));
