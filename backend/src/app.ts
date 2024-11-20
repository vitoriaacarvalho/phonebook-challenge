import express from 'express';
import router from './routes/ContactApiRoutes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger'; 

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});