import { z, ZodError } from "zod";
import { IController, IRequest, IResponse } from "../interfaces/IController";
import { CreateTodoItemUseCase } from "../useCases/todoItem/CreateTodoItemUseCase";


const schema = z.object({
    title: z.string().min(2),
    description: z.string().min(2),
})

export class CreateTodoItemController implements IController{
    constructor(private readonly createTodoItemUseCase: CreateTodoItemUseCase){}

    async handle({ body, userId }: IRequest): Promise<IResponse> {
        try {

            const { title, description } = schema.parse(body);

            if (!userId){
                return {
                    statusCode: 400,
                    body: {
                        error: 'User id undefined',
                    }
                };
            }

            const todoItem = await this.createTodoItemUseCase.execute({ userId, title, description});

            return {
                statusCode: 200,
                body: todoItem,
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
