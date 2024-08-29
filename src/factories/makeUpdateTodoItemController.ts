import { UpdateTodoItemController } from "../application/controllers/UpdateTodoItemController";
import { makeUpdateTodoItemUseCase } from "./makeUpdateTodoItemUseCase";

export function makeUpdateTodoItemController(){
    const updateTodoItemUseCase = makeUpdateTodoItemUseCase();

    return new UpdateTodoItemController(updateTodoItemUseCase);
}
