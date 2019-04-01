import * as path from 'path';
import * as fs from 'fs';
import { Contract } from './contract';

export class ContractFile extends Contract{
  public path: string;
  public fileName: string | null;
  constructor(filePath: string) {
    if (!fs.existsSync(filePath)) {
      throw new Error(`File ${filePath} not found!`);
    }
    super(fs.readFileSync(filePath, 'utf-8').split('\n'));
    this.path = filePath;
    this.fileName = path.basename(filePath);
  }

  getFilename(): string | null {
    return this.fileName;
  }

  getPath(): string {
    return this.path;
  }

  save(path: string = ''): Promise<void> {
    if (!path || path === '' ) {
      path = this.path;
    }
    return new Promise((resolve, reject) => {
      let file = fs.createWriteStream(path);
      file.on('error', function(err) { reject(err); });
      this.lines.forEach((line) => {
        file.write(line + '\n');
      });
      file.end();
      resolve();
    });
  }

}
