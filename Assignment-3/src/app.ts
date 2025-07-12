
import express, { Application, Request, Response } from 'express';
import { booksRoute } from './app/routes/books.route';
import { globalErrorHandler } from './app/utils/globalError';
import { borrowRoute } from './app/routes/borrow.route';
import path from 'path';

const app: Application = express();


// Middleware
app.use(express.json());
app.use("/api/books",booksRoute)
app.use("/api/borrow",borrowRoute)
// Root route
app.get('/', (req: Request, res: Response) => {
 res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});



app.use(globalErrorHandler);

export default app;