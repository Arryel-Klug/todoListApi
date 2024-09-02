
import { ReadAllTodoItemController } from "../application/controllers/ReadAllTodoItemController";
import { makeReadAllTodoItemUseCase } from "./makeReadAllTodoItemUseCase";

export function makeReadAllTodoItemController(){
    const readAllTodoItemUseCase = makeReadAllTodoItemUseCase();

    return new ReadAllTodoItemController(readAllTodoItemUseCase);
}
