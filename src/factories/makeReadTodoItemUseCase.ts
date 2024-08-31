import { ReadTodoItemUseCase } from "../application/useCases/todoItem/ReadTodoItemUseCase";

export function makeReadTodoItemUseCase(){
    return new ReadTodoItemUseCase();
}
