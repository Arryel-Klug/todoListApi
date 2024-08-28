import { z, ZodError } from "zod";
import { IController, IRequest, IResponse } from "../interfaces/IController";
import { DeleteTodoItemUseCase } from "../useCases/todoItem/DeleteTodoItemUseCase";
import { GetTodoItemUseCase } from "../useCases/todoItem/GetTodoItemUseCase";

const schema = z.object({
    id: z.string().uuid(),
})

export class DeleteTodoItemController implements IController{
    constructor(
        private readonly deleteTodoItemUseCase: DeleteTodoItemUseCase,
        private readonly getTodoItemUseCase: GetTodoItemUseCase
    ) {}

    async handle({ params, userId }: IRequest): Promise<IResponse> {
        try {

            const { id } = schema.parse(params);

            if (!userId){
                return {
                    statusCode: 400,
                    body: {
                        error: 'User id undefined',
                    }
                };
            }

            await this.deleteTodoItemUseCase.execute({ id, userId });
                return {
                    statusCode: 204,
                    body: null,
                }

        } catch (error){
            if (error instanceof ZodError){
                return {
                    statusCode: 400,
                    body: error.issues,
                };
            }

            throw error;
        }
    }
}
