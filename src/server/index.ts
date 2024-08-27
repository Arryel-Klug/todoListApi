import express from 'express';
import { SignUpController } from '../application/controllers/SignUpController';
import { SignUpUseCase } from '../application/useCases/authentication/SignUpUseCase';

const app = express();
const port = 3001;

app.post('/sign-up', (request, response) => {
    const SALT = 10;
    const signUpUseCase = new SignUpUseCase(SALT)
    const signUpController = new SignUpController(signUpUseCase);
});

// app.get('/*', (request, response) => {
//     response.send(404).json({
//         message: 'Not Found'
//     })
// })

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}.`)
});
