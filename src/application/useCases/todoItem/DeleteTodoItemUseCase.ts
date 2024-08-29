import { prismaClient } from "../../libs/prismaClient";

interface IInput{
    id: string;
    userId: string;
}

type IOutput = void;

export class DeleteTodoItemUseCase{
    async execute ({ id, userId }: IInput): Promise<IOutput>{

        try {
            await prismaClient.todoItem.delete({
                where: { id, userId },
            })

        } catch (error) {
            console.log('Deleting: Todo item not found.', {
                id, userId
            })
        }
    }
};
