export interface IUseCase<Params = unknown, Response = unknown> {
  execute(data?: Params): Promise<Response>;
}
