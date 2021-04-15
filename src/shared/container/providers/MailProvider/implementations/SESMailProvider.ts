import fs from 'fs';
import handlebars from 'handlebars';

import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

import { IMailParams, IMailProvider } from '../protocols/IMailProvider';

export class SESMailProvider implements IMailProvider {
  private client: SESClient;

  constructor() {
    this.client = new SESClient({
      region: process.env.AWS_REGION,
    });
  }

  async sendMail({ to, subject, variables, path }: IMailParams): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString('utf-8');

    const templateParse = handlebars.compile(templateFileContent);

    const templateHtml = templateParse(variables);

    await this.client.send(
      new SendEmailCommand({
        Source: 'Rentx <noreply@marcoscorsi.com>',
        Destination: {
          ToAddresses: [to],
        },
        Message: {
          Body: {
            Html: {
              Data: templateHtml,
            },
          },
          Subject: {
            Data: subject,
          },
        },
      })
    );
  }
}
