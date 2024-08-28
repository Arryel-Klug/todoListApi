import { prismaClient } from "../../libs/prismaClient";
import {Prisma} from '@prisma/client';

interface IInput{
    id: string;
    userId: string;
}

type IOutput = void;

export class DeleteTodoItemUseCase{
    async execute ({ id, userId }: IInput): Promise<IOutput>{
        try{
            await prismaClient.todoItem.delete({
                where: { id, userId },
            })
        } catch (error) {
            if(error instanceof Prisma.PrismaClientKnownRequestError){

                if (error.code === 'P2025') {
                    null
                }
            }
        }
    }
};
