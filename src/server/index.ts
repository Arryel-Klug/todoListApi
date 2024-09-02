import express from 'express';
import { routeAdpater } from './adapters/routeAdapter';
import { middlewareAdapter } from './adapters/middlewareAdapter';
import { makeSignUpController } from '../factories/makeSignUpController';
import { makeSignInController } from '../factories/makeSignInController';
import { makeCreateTodoItemController } from '../factories/makeCreateTodoItemController';
import { makeAuthenticationMiddleware } from '../factories/makeAuthenticationMiddleware';
import { makeDeleteTodoItemController } from '../factories/makeDeleteTodoItemController';
import { makeUpdateTodoItemController } from '../factories/makeUpdateTodoItemController';
import { makeReadTodoItemController } from '../factories/makeReadTodoItemController';
import errorHandler from '../application/middlewares/ErrorHandlerMiddleware';
import { makeReadAllTodoItemController } from '../factories/makeReadAllTodoItemController';


const app = express();
const port = process.env.PORT;

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

app.get('/todos/:id',
    middlewareAdapter(makeAuthenticationMiddleware()),
    routeAdpater(makeReadTodoItemController()));

app.get('/todos',
    middlewareAdapter(makeAuthenticationMiddleware()),
    routeAdpater(makeReadAllTodoItemController()));

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}.`)
});
