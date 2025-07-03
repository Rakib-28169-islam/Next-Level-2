import express, { Application, Request, Response } from 'express';


const app: Application = express();


// Middleware
app.use(express.json());

// Root route
app.get('/', (req: Request, res: Response) => {
  res.send('Backend Server is ready for A3');
});




export default app;