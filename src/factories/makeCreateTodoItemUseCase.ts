import { CreateTodoItemUseCase } from "../application/useCases/todoItem/CreateTodoItemUseCase";

export function makeCreateTodoItemUseCase(){
    return new CreateTodoItemUseCase();
}
