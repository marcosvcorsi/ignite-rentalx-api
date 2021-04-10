import { IMailProvider } from '@/shared/container/providers/MailProvider/protocols/IMailProvider';

export class MailProviderInMemory implements IMailProvider {
  async sendMail(): Promise<void> {
    return Promise.resolve();
  }
}
