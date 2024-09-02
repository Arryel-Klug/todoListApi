import { z, ZodError } from "zod";
import { IController, IRequest, IResponse } from "../interfaces/IController";
import { ReadAllTodoItemUseCase } from "../useCases/todoItem/ReadAllTodoItemUseCase";

export class ReadAllTodoItemController implements IController{
    constructor(private readonly readAllTodoItemUseCase: ReadAllTodoItemUseCase) {}

    async handle({ query, userId }: IRequest): Promise<IResponse> {

        let { page, limit } = query;

        if(!page){
            page = 1;
        }

        if(!limit){
            limit = 10;
        }

        page = parseInt(page);
        limit = parseInt(limit);

        try {

            if (!userId){
                return {
                    statusCode: 400,
                    body: {
                        error: 'User id undefined',
                    }
                };
            }

            const result = await this.readAllTodoItemUseCase.execute({ userId, page, limit });

            if (!result){
                return {
                    statusCode: 404,
                    body: {
                        message: "Todo item not find for the user."
                    }
                }
            }

            return {
                statusCode: 200,
                body: {
                    data: result.todoItems,
                    page,
                    limit,
                    total: result.totalCount
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
