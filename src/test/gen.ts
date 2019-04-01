import { generateCommentsFromFile, generateCommentsFromText } from '../soldoc/index';
import * as path from 'path';
import * as fs from 'fs';

const file = path.resolve(__dirname, './migrations.sol')
console.log(generateCommentsFromFile(file))

