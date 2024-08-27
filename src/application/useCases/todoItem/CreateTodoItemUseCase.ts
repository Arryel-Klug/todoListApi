import { prismaClient } from "../../libs/prismaClient";

interface IInput{
    userId: string;
    title: string;
    description: string;
}

interface IOutput{
    id: string;
    title: string;
    description: string;
}

export class CreateTodoItemUseCase{
    async execute ({ userId ,title, description }: IInput): Promise<IOutput>{
        const todoItem = await prismaClient.todoItem.create({
            data: {
                userId,
                title,
                description,
            }
        });

        return todoItem;
    }

}
