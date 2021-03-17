export interface IUseCase<Params, Response> {
  execute(data: Params): Promise<Response>;
}
