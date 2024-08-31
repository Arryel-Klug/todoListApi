
import { ReadTodoItemController } from "../application/controllers/ReadTodoItemController";
import { makeReadTodoItemUseCase } from "./makeReadTodoItemUseCase";

export function makeReadTodoItemController(){
    const readTodoItemUseCase = makeReadTodoItemUseCase();

    return new ReadTodoItemController(readTodoItemUseCase);
}
