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
    async execute ({ userId, id }: IInput): Promise<IOutput | null >{

        const todoItem = await prismaClient.todoItem.findUnique({
            where: { userId, id },
    })

        return todoItem;
    }
};
