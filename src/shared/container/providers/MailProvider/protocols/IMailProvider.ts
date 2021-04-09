export type IMailParams = {
  to: string;
  subject: string;
  variables: any;
  path: string;
};

export interface IMailProvider {
  sendMail(data: IMailParams): Promise<void>;
}
