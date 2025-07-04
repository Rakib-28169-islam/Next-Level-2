import express, { Application, Request, Response } from 'express';
import { booksRoute } from './app/routes/books.route';
import { globalErrorHandler } from './app/utils/globalError';
import { borrowRoute } from './app/routes/borrow.route';


const app: Application = express();


// Middleware
app.use(express.json());
app.use("/api/books",booksRoute)
app.use("/api/borrow",borrowRoute)
// Root route
app.get('/', (req: Request, res: Response) => {
  

});



app.use(globalErrorHandler);

export default app;