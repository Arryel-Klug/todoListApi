import { z, ZodError } from "zod";
import { IController, IRequest, IResponse } from "../interfaces/IController";
import { ReadTodoItemUseCase } from "../useCases/todoItem/ReadTodoItemUseCase";


const schema = z.object({
     id: z.string().uuid(),

})

export class ReadTodoItemController implements IController{
    constructor(private readonly readTodoItemUseCase: ReadTodoItemUseCase) {}

    async handle({ params, userId }: IRequest): Promise<IResponse> {
        try {


            const { id } = params;

            if (!userId){
                return {
                    statusCode: 400,
                    body: {
                        error: 'User id undefined',
                    }
                };
            }

            const todoItem = await this.readTodoItemUseCase.execute({ id, userId });

            console.log(todoItem)

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
