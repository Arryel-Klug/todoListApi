import { CreateTodoItemController } from "../application/controllers/CreateTodoItemController";
import { makeCreateTodoItemUseCase } from "./makeCreateTodoItemUseCase";

export function makeCreateTodoItemController(){
    const createTodoItemUseCase = makeCreateTodoItemUseCase();

    return new CreateTodoItemController(createTodoItemUseCase);
}
