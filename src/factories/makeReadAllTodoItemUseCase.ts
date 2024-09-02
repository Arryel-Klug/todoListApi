import { ReadAllTodoItemUseCase } from "../application/useCases/todoItem/ReadAllTodoItemUseCase";

export function makeReadAllTodoItemUseCase(){
    return new ReadAllTodoItemUseCase();
}
