import { generateCommentsFromFile } from '../soldoc/index';
import * as path from 'path';
const file = path.resolve(__dirname, './bugsbunny.sol')
generateCommentsFromFile(file)

