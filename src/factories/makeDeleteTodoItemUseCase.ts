import { DeleteTodoItemUseCase } from "../application/useCases/todoItem/DeleteTodoItemUseCase";

export function makeDeleteTodoItemUseCase(){
    return new DeleteTodoItemUseCase();
}
