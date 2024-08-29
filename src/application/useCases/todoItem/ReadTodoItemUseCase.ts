import { prismaClient } from "../../libs/prismaClient";

interface IInput{
    id: string;
    userId: string;
}

interface IOutput{
    id: string;
    title: string;
    description: string;
}

export class ReadTodoItemUseCase{
    async execute ({ id, userId }: IInput): Promise<IOutput[] | null>{
        const todoitem = await prismaClient.todoItem.findMany({
            where: { id, userId },
        });

        return todoitem;
    }
};
