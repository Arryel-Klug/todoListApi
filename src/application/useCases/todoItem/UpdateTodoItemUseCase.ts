import { prismaClient } from "../../libs/prismaClient";

interface IInput{
    id: string;
    userId: string;
    title: string;
    description: string;
}

interface IOutput{
    id: string;
    title: string;
    description: string;
}

export class UpdateTodoItemUseCase{
    async execute ({ userId ,title, description, id }: IInput): Promise<IOutput>{
        const todoItem = await prismaClient.todoItem.update({
            data: {
                userId,
                title,
                description,
            },
            where: {
                id,
                userId
            },
            select: {
                id: true,
                title: true,
                description: true
            }
        });

        return todoItem;
    }

}
