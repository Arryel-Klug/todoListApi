import express from 'express';
import { routeAdpater } from './adapters/routeAdapter';
import { middlewareAdapter } from './adapters/middlewareAdapter';
import { makeSignUpController } from '../factories/makeSignUpController';
import { makeSignInController } from '../factories/makeSignInController';
import { makeCreateTodoItemController } from '../factories/makeCreateTodoItemController';
import { makeAuthenticationMiddleware } from '../factories/makeAuthenticationMiddleware';

const app = express();
const port = 3001;

app.use(express.json());

app.post('/sign-up', routeAdpater(makeSignUpController()));
app.post('/sign-in', routeAdpater(makeSignInController()));

app.post('/todos',
    middlewareAdapter(makeAuthenticationMiddleware()),
    routeAdpater(makeCreateTodoItemController()));

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}.`)
});
