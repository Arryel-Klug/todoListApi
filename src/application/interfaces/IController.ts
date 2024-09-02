export interface IRequest {
    body: Record<string, any>;
    params: Record<string, string>;
    query: object | any;
    userId: string | undefined;
}

export interface IResponse {
    statusCode: number;
    body: Record<string, any> | null;
}

export interface IController {
    handle(request: IRequest): Promise<IResponse>;
}
