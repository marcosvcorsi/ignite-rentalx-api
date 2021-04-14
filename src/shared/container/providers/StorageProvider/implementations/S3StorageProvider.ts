import fs from 'fs';
import mime from 'mime';
import { resolve } from 'path';

import upload from '@/config/upload';
import { S3 } from '@aws-sdk/client-s3';

import { IStorageProvider } from '../protocols/IStorageProvider';

export class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new S3({
      region: process.env.AWS_REGION,
    });
  }

  async save(folder: string, filename: string): Promise<string> {
    const originalName = resolve(upload.tmpFolder, filename);

    const fileContent = await fs.promises.readFile(originalName);

    const contentType = mime.getType(originalName);

    await this.client.putObject({
      Bucket: process.env.AWS_BUCKET,
      Key: `${folder}/${filename}`,
      ACL: 'public-read',
      Body: fileContent,
      ContentType: contentType,
    });

    await fs.promises.unlink(originalName);

    return filename;
  }

  async delete(folder: string, filename: string): Promise<string> {
    await this.client.deleteObject({
      Bucket: process.env.AWS_BUCKET,
      Key: `${folder}/${filename}`,
    });

    return filename;
  }
}
