import express, { NextFunction, Request, Response } from 'express';
import { routeAdpater } from './adapters/routeAdapter';
import { middlewareAdapter } from './adapters/middlewareAdapter';
import { makeSignUpController } from '../factories/makeSignUpController';
import { makeSignInController } from '../factories/makeSignInController';
import { makeCreateTodoItemController } from '../factories/makeCreateTodoItemController';
import { makeAuthenticationMiddleware } from '../factories/makeAuthenticationMiddleware';
import { makeDeleteTodoItemController } from '../factories/makeDeleteTodoItemController';
import { makeUpdateTodoItemController } from '../factories/makeUpdateTodoItemController';

const app = express();
const port = 3001;

app.use(express.json());

app.post('/sign-up', routeAdpater(makeSignUpController()));
app.post('/sign-in', routeAdpater(makeSignInController()));

app.post('/todos',
    middlewareAdapter(makeAuthenticationMiddleware()),
    routeAdpater(makeCreateTodoItemController()));

app.delete('/todos/:id',
    middlewareAdapter(makeAuthenticationMiddleware()),
    routeAdpater(makeDeleteTodoItemController()));

app.put('/todos/:id',
    middlewareAdapter(makeAuthenticationMiddleware()),
    routeAdpater(makeUpdateTodoItemController()));



app.use((error: Error,request: Request ,response: Response, next: NextFunction) => {
    console.error(error);
    response.status(500).send(error);
});

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}.`)
});
