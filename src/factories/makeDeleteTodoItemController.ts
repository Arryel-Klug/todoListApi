import { DeleteTodoItemController } from "../application/controllers/DeleteTodoItemController";
import { makeDeleteTodoItemUseCase } from "./makeDeleteTodoItemUseCase";

export function makeDeleteTodoItemController(){
    const deleteTodoItemUseCase = makeDeleteTodoItemUseCase();

    return new DeleteTodoItemController(deleteTodoItemUseCase);
}
