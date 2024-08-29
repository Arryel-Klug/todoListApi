import { z, ZodError } from "zod";
import { IController, IRequest, IResponse } from "../interfaces/IController";
import { UpdateTodoItemUseCase } from "../useCases/todoItem/UpdateTodoItemUseCase";


const schema = z.object({
    // id: z.string().uuid(),
    title: z.string().min(2),
    description: z.string().min(2),
})

export class UpdateTodoItemController implements IController{
    constructor(private readonly updateTodoItemUseCase: UpdateTodoItemUseCase) {}

    async handle({ body ,params, userId }: IRequest): Promise<IResponse> {
        try {

            const { title, description } = schema.parse(body);
            const { id } = params;

            if (!userId){
                return {
                    statusCode: 400,
                    body: {
                        error: 'User id undefined',
                    }
                };
            }

            const todoItem = await this.updateTodoItemUseCase.execute({ id, userId, title, description });

            return {
                statusCode: 200,
                body: {
                    todoItem
                },
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
