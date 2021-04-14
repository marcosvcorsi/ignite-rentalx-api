import fs from 'fs';
import { resolve } from 'path';

import upload from '@/config/upload';

import { IStorageProvider } from '../protocols/IStorageProvider';

const { tmpFolder } = upload;

export class LocalStorageProvider implements IStorageProvider {
  async save(folder: string, file: string): Promise<string> {
    await fs.promises.rename(
      resolve(tmpFolder, file),
      resolve(`${tmpFolder}/${folder}`, file)
    );

    return file;
  }

  async delete(folder: string, filename: string): Promise<string> {
    const filePath = resolve(`${tmpFolder}/${folder}`, filename);

    try {
      await fs.promises.stat(filePath);
    } catch (error) {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}
