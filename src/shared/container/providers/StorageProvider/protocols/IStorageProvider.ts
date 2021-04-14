export interface IStorageProvider {
  save(folder: string, filename: string): Promise<string>;
  delete(folder: string, filename: string): Promise<string>;
}
