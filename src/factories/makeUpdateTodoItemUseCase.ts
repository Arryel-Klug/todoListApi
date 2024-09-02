import { UpdateTodoItemUseCase } from "../application/useCases/todoItem/UpdateTodoItemUseCase";

export function makeUpdateTodoItemUseCase(){
    return new UpdateTodoItemUseCase();
}
