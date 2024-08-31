import { prismaClient } from "../../libs/prismaClient";

interface IInput{
    userId: string;
    page: number;
    limit: number;
}

interface IOutput{
    id: string;
    title: string;
    description: string;
}

export class ReadAllTodoItemUseCase{
    async execute ({ userId, page, limit }: IInput): Promise< { items:IOutput[]; total: number } | null | any>{

        const skip = (page -1)*limit;
        const take = limit;

        const [todoItems, totalItems] = await Promise.all([ prismaClient.todoItem.findMany({
            where: { userId },
            skip,
            take,
        }),
        prismaClient.todoItem.count({
            where: { userId },
        }),
    ])
        return { items: todoItems, total: totalItems};
    }
};
