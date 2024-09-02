import { prismaClient } from "../../libs/prismaClient";

interface IInput{
    userId: string;
    page: number;
    limit: number;

}

interface IOutput {
    totalCount: number;
    todoItems: {
        id: string;
        title: string;
        description: string;
    }[];
}


export class ReadAllTodoItemUseCase{
    async execute ({ userId, page, limit }: IInput): Promise<IOutput| null >{
        const countTodoItems = await prismaClient.todoItem.count({
            where: { userId },
        });

        const todoItems = await prismaClient.todoItem.findMany({
            where: { userId },

            select: {
                id: true,
                title: true,
                description: true,
            },

            skip: (page-1)*limit,
            take: limit

    });

        return {
            totalCount: countTodoItems,
            todoItems
        };
    }
};
